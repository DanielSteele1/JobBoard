
import './App.css';
import '@mantine/core/styles.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navigation from './Components/Navigation.tsx';
import Dashboard from './Components/Dashboard.tsx';
import Footer from './Components/Footer.tsx';
import NotFound from './Components/NotFound.tsx';

import { useState } from 'react';
import { useEffect } from 'react';
import { MantineProvider } from '@mantine/core';

function App() {

  const [isLightOn, setLightOn] = useState(() => {

    const savedTheme = localStorage.getItem("theme");
    return savedTheme ? savedTheme === 'light': false;

  });

   const toggleLight: React.MouseEventHandler<HTMLDivElement> = () => {
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
        <Navigation isLightOn={isLightOn} toggleLight={toggleLight} />

        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='*' element={<NotFound />} />
        </Routes>

        <Footer />
      </BrowserRouter>
    </MantineProvider>

  )
}

export default App;
