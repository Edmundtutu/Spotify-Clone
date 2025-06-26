import React, { useState, useRef, useEffect } from 'react';
import '../css/music-player.css';
import { useMusicContext } from '../context/MusicContext';
import { useLikedSongs } from '../hooks/useLikedSongs';
import { formatDuration, getImageUrl } from '../services/api';

const MusicPlayer: React.FC = () => {
  const { 
    currentTrack, 
    isPlaying, 
    togglePlayPause, 
    nextTrack, 
    previousTrack,
    playlist,
    currentIndex
  } = useMusicContext();
  
  const { isLiked, toggleLike } = useLikedSongs();
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrack?.preview_url) return;

    audio.src = currentTrack.preview_url;
    
    if (isPlaying) {
      audio.play().catch(console.error);
    } else {
      audio.pause();
    }
  }, [currentTrack, isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => {
      if (currentIndex < playlist.length - 1) {
        nextTrack();
      } else {
        togglePlayPause();
      }
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [currentIndex, playlist.length, nextTrack, togglePlayPause]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (audio) {
      const newTime = (parseFloat(e.target.value) / 100) * duration;
      audio.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value) / 100;
    setVolume(newVolume);
    setIsMuted(false);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  if (!currentTrack) {
    return null;
  }

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;
  const volumePercentage = volume * 100;
  const imageUrl = getImageUrl(currentTrack.album.images);
  const artistName = currentTrack.artists && currentTrack.artists.length > 0 
    ? currentTrack.artists[0].name 
    : 'Unknown Artist';

  return (
    <div className="music-player">
      <audio ref={audioRef} />
      
      <div className="music-player-track-info">
        <img 
          src={imageUrl} 
          alt={currentTrack.name}
          className="music-player-image"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/default-album-cover.jpg';
          }}
        />
        <div className="music-player-details">
          <div className="music-player-title" title={currentTrack.name}>
            {currentTrack.name}
          </div>
          <div className="music-player-artist" title={artistName}>
            {artistName}
          </div>
        </div>
        <button 
          className={`music-player-like-button ${isLiked(currentTrack.id) ? 'liked' : ''}`}
          onClick={() => toggleLike(currentTrack)}
          aria-label={isLiked(currentTrack.id) ? 'Remove from liked songs' : 'Add to liked songs'}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill={isLiked(currentTrack.id) ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
      </div>

      <div className="music-player-controls">
        <div className="music-player-buttons">
          <button 
            className="music-player-button"
            onClick={previousTrack}
            disabled={currentIndex === 0}
            aria-label="Previous track"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M.5 3.5A.5.5 0 0 1 1 4v3.248l6.267-3.636c.52-.302 1.233.043 1.233.696v2.94l6.267-3.636c.52-.302 1.233.043 1.233.696v7.384c0 .653-.713.998-1.233.696L8.5 8.752v2.94c0 .653-.713.998-1.233.696L1 8.752V12a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5z"/>
            </svg>
          </button>
          
          <button 
            className="music-player-play-button"
            onClick={togglePlayPause}
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M5.5 3.5A1.5 1.5 0 0 1 7 2h2a1.5 1.5 0 0 1 1.5 1.5v9A1.5 1.5 0 0 1 9 14H7a1.5 1.5 0 0 1-1.5-1.5v-9z"/>
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
              </svg>
            )}
          </button>
          
          <button 
            className="music-player-button"
            onClick={nextTrack}
            disabled={currentIndex === playlist.length - 1}
            aria-label="Next track"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M15.5 3.5a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V8.752l-6.267 3.636c-.52.302-1.233-.043-1.233-.696v-2.94l-6.267 3.636C.713 12.69 0 12.345 0 11.692V4.308c0-.653.713-.998 1.233-.696L7.5 7.248v-2.94c0-.653.713-.998 1.233-.696L15 7.248V4a.5.5 0 0 1 .5-.5z"/>
            </svg>
          </button>
        </div>
        
        <div className="music-player-progress">
          <span className="music-player-time">
            {formatDuration(currentTime * 1000)}
          </span>
          <div className="music-player-progress-bar">
            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={handleSeek}
              className="music-player-slider"
            />
          </div>
          <span className="music-player-time">
            {formatDuration(duration * 1000)}
          </span>
        </div>
      </div>

      <div className="music-player-volume">
        <button 
          className="music-player-volume-button"
          onClick={toggleMute}
          aria-label={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted || volume === 0 ? (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06zM9.5 6a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0V7a.5.5 0 0 1 .5-.5z"/>
              <path d="M11.5 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5z"/>
            </svg>
          ) : volume < 0.5 ? (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M9 4a.5.5 0 0 0-.812-.39L5.825 5.5H3.5A.5.5 0 0 0 3 6v4a.5.5 0 0 0 .5.5h2.325l2.363 1.89A.5.5 0 0 0 9 12V4zM6.312 6.39 8 5.04v5.92L6.312 9.61A.5.5 0 0 0 6 9.5H4v-3h2a.5.5 0 0 0 .312-.11zM12.025 8a4.486 4.486 0 0 1-1.318 3.182L10 10.475A3.489 3.489 0 0 0 11.025 8 3.49 3.49 0 0 0 10 5.525l.707-.707A4.486 4.486 0 0 1 12.025 8z"/>
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
              <path d="M6.271 5.055a.5.5 0 0 1 .52.038L9 6.327a.5.5 0 0 1 0 .866L6.791 8.427a.5.5 0 0 1-.791-.407V5.5a.5.5 0 0 1 .271-.445z"/>
            </svg>
          )}
        </button>
        <div className="music-player-volume-slider">
          <input
            type="range"
            min="0"
            max="100"
            value={volumePercentage}
            onChange={handleVolumeChange}
            className="music-player-slider"
          />
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;