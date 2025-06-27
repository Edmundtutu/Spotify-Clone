import { Route, Routes } from 'react-router-dom';
import { MusicProvider } from './context/MusicContext';
import Home from './pages/Home';
import LikedSongs from './pages/LikedSongs';
import NavBar from './components/NavBar';
import MusicPlayer from './components/MusicPlayer';
import PWAUpdatePrompt from './components/PWAUpdatePrompt';
import './css/global.css';

function App() {
  const handlePWAUpdate = () => {
    window.location.reload();
  };

  const handlePWASkip = () => {
    // Hide the update prompt
    const prompt = document.querySelector('.pwa-update-prompt');
    if (prompt) {
      prompt.remove();
    }
  };

  return (
    <MusicProvider>
      <div className="app">
        <NavBar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/liked" element={<LikedSongs />} />
          </Routes>
        </main>
        <MusicPlayer />
        <PWAUpdatePrompt onUpdate={handlePWAUpdate} onSkip={handlePWASkip} />
      </div>
    </MusicProvider>
  );
}

export default App;