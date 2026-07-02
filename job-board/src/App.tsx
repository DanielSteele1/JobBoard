
import './App.css';
import '@mantine/core/styles.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Dashboard from './Components/Dashboard.tsx';
import NotFound from './Components/NotFound.tsx';
import Sidebar from './Components/Sidebar.tsx';

import { useState } from 'react';
import { useEffect } from 'react';
import { MantineProvider } from '@mantine/core';
import { Analytics } from '@vercel/analytics/react';
import Profile from './Components/Profile.tsx';
import YourJobs from './Components/YourJobs.tsx';
import MobileNav from './Components/MobileNav.tsx';

import Login from './Components/Login.tsx';
import Signup from './Components/Signup.tsx';
import History from './Components/History.tsx';

import { GoogleOAuthProvider } from '@react-oauth/google';
import { supabase } from './Components/Supabase.ts';
import useStore from './State/ZustandStore.tsx';

function App() {

  const isLoggedIn = useStore((state: any) => state.isLoggedIn);
  const userProfile = useStore((state: any) => state.userProfile);

  const setAppliedJobs = useStore((state: any) => state.setAppliedJobs);
  const setSavedJobs = useStore((state: any) => state.setSavedJobs);
  const setInterviewingJobs = useStore((state: any) => state.setInterviewingJobs);
  const setOffers = useStore((state: any) => state.setOffers);


  const [isLightOn, setLightOn] = useState(() => {

    const savedTheme = localStorage.getItem("theme");
    return savedTheme ? savedTheme === 'light' : false;

  });

  const toggleLight: React.MouseEventHandler<HTMLButtonElement> = () => {
    setLightOn(prev => !prev);
  };

  const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  useEffect(() => {

    const theme = isLightOn ? "light" : "dark";

    document.documentElement.setAttribute(
      "data-mantine-color-scheme", theme,
    );

    localStorage.setItem("theme", theme);

  }, [isLightOn]);


  // if user has authenticated with google, then pull from supabase. 
  // supabase sync

  useEffect(() => {

    if (!isLoggedIn) return;
    if (userProfile?.signin_method === 'Guest Account') return;

    const fetchJobs = async () => {

      const { data, error } = await supabase
        .from('Users')
        .select('applied_jobs, saved_jobs, interviewing_jobs, offer_jobs')
        .eq('id', userProfile.id)
        .single();

      if (error) {
        setAppliedJobs(null);
        console.log(error);
      }

      if (data) {
        setAppliedJobs(data.applied_jobs || []);
        setSavedJobs(data.saved_jobs || []);
        setInterviewingJobs(data.interviewing_jobs || []);
        setOffers(data.offer_jobs || []);
      }

    }
    fetchJobs();

  }, [isLoggedIn, userProfile?.signin_method]);


  return (
    <div className="App-wrapper">

      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        <MantineProvider data-mantine-color-scheme={isLightOn ? 'dark' : 'light'}>
          <BrowserRouter>

            <Sidebar isLightOn={isLightOn} toggleLight={toggleLight} />
            <div className="main-content">
              <Signup />

              <Routes>

                <Route path='/Profile' element={<Profile />} />
                <Route path='/Login' element={<Login />} />

                <Route path='/YourJobs' element={<YourJobs />} />
                <Route path='/History' element={<History />} />
                <Route path='/' element={<Dashboard id={''} title={''} location={{
                  display_name: '',
                  area: undefined
                }} description={''} salary_max={''} salary_min={''} contract_type={''} created={''} />} />

                <Route path='*' element={<NotFound />} />
              </Routes>
            </div>
            <MobileNav />

            <Analytics />
          </BrowserRouter>
        </MantineProvider>
      </GoogleOAuthProvider>
    </div>

  )
}

export default App;