
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

import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {

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
