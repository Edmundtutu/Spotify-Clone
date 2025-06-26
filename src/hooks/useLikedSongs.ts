import { useState, useEffect } from 'react';
import { Track } from '../services/api';

export const useLikedSongs = () => {
  const [likedSongs, setLikedSongs] = useState<Track[]>([]);

  useEffect(() => {
    const savedLikedSongs = localStorage.getItem('likedSongs');
    if (savedLikedSongs) {
      setLikedSongs(JSON.parse(savedLikedSongs));
    }
  }, []);

  const addToLiked = (track: Track) => {
    const updatedLikedSongs = [...likedSongs, track];
    setLikedSongs(updatedLikedSongs);
    localStorage.setItem('likedSongs', JSON.stringify(updatedLikedSongs));
  };

  const removeFromLiked = (trackId: string) => {
    const updatedLikedSongs = likedSongs.filter(track => track.id !== trackId);
    setLikedSongs(updatedLikedSongs);
    localStorage.setItem('likedSongs', JSON.stringify(updatedLikedSongs));
  };

  const isLiked = (trackId: string) => {
    return likedSongs.some(track => track.id === trackId);
  };

  const toggleLike = (track: Track) => {
    if (isLiked(track.id)) {
      removeFromLiked(track.id);
    } else {
      addToLiked(track);
    }
  };

  return {
    likedSongs,
    addToLiked,
    removeFromLiked,
    isLiked,
    toggleLike
  };
};