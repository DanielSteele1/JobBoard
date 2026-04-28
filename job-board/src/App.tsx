import './App.css'


import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navigation from './Components/Navigation.tsx';
import Dashboard from './Components/Dashboard.tsx';
import Footer from './Components/Footer.tsx';
import NotFound from './Components/NotFound.tsx';

function App() {

  return (

    <section>
      <BrowserRouter>
        <Routes>

          <Route path='/Navigation' element={<Navigation />} />
          <Route path='/Dashboard' element={<Dashboard />} />
          <Route path='/Footer' element={<Footer />} />

          <Route path='*' element={<NotFound />} />

        </Routes>
      </BrowserRouter>

    </section>
  )
}

export default App;
