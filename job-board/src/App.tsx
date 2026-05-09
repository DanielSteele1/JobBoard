
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

function App() {

  const [isLightOn, setLightOn] = useState(() => {

    const savedTheme = localStorage.getItem("theme");
    return savedTheme ? savedTheme === 'light' : false;

  });

  const toggleLight: React.MouseEventHandler<HTMLButtonElement> = () => {
    setLightOn(prev => !prev);
  };

  useEffect(() => {

    const theme = isLightOn ? "light" : "dark";

    document.documentElement.setAttribute(
      "data-mantine-color-scheme", theme,
    );

    localStorage.setItem("theme", theme);


  }), ([isLightOn, setLightOn]);

  return (

    <MantineProvider data-mantine-color-scheme={isLightOn ? 'dark' : 'light'}>
      <BrowserRouter>

        <Sidebar isLightOn={isLightOn} toggleLight={toggleLight} />

        <Routes>
          <Route path='/Profile' element={<Profile />} />
          <Route path='/YourJobs' element={<YourJobs />} />
          <Route path='/' element={<Dashboard id={''} title={''} location={{
            display_name: '',
            area: undefined
          }} description={''} salary_max={''} salary_min={''} contract_type={''} created={''} />} />

          <Route path='*' element={<NotFound />} />
        </Routes>

        <Analytics />
      </BrowserRouter>
    </MantineProvider>

  )
}

export default App;
