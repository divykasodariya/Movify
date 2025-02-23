// App.jsx
import { useState } from 'react';
import "./App.css";
import { Route, Routes } from 'react-router-dom';
import Home from "./pages/Home.jsx";
import Fav from './pages/Fav.jsx';
import Navbar from './components/Navbar.jsx';
import { MoviesProvider } from './pages/MoviesContext.jsx';
import { FavMoviesprovider } from './pages/FavMoviesContext.jsx';

function App() {
  return (
    <FavMoviesprovider>  
      <MoviesProvider>
        <div>
          <Navbar />
          <main className='main-content'>
            <Routes>
              <Route path='/' element={<Home />}></Route>
              <Route path='/fav' element={<Fav />}></Route>
            </Routes>
          </main>
        </div>
      </MoviesProvider>
    </FavMoviesprovider>
  );
}

export default App;