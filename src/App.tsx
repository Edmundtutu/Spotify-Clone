import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { MusicProvider } from './context/MusicContext';
import Home from './pages/Home';
import LikedSongs from './pages/LikedSongs';
import ListPage from './pages/ListPage';
import NavBar from './components/NavBar';
import MusicPlayer from './components/MusicPlayer';
import './css/global.css';

function App() {
  return (
    <MusicProvider>
      <div className="app">
        <NavBar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/liked" element={<LikedSongs />} />
            <Route path="/list" element={<ListPage />} />
          </Routes>
        </main>
        <MusicPlayer />
      </div>
    </MusicProvider>
  );
}

export default App;