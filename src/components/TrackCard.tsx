import React from 'react';
import '../css/track-card.css';
import { Track, getImageUrl } from '../services/api';
import { useMusicContext } from '../context/MusicContext';
import { useLikedSongs } from '../hooks/useLikedSongs';

interface TrackCardProps {
  track: Track;
  playlist?: Track[];
}

const TrackCard: React.FC<TrackCardProps> = ({ track, playlist = [] }) => {
  const { playTrack, currentTrack, isPlaying } = useMusicContext();
  const { isLiked, toggleLike } = useLikedSongs();
  
  const isCurrentTrack = currentTrack?.id === track.id;
  const imageUrl = getImageUrl(track.album.images);
  const artistName = track.artists && track.artists.length > 0 ? track.artists[0].name : 'Unknown Artist';

  const handlePlayClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    playTrack(track, playlist.length > 0 ? playlist : [track]);
  };

  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleLike(track);
  };

  return (
    <div className={`track-card ${isCurrentTrack ? 'track-card-active' : ''}`}>
      <div className="track-card-image-container">
        <img 
          className="track-card-image" 
          src={imageUrl} 
          alt={track.name}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/default-album-cover.jpg';
          }}
        />
        <div className="track-overlay">
          <button 
            className="track-card-play-button" 
            onClick={handlePlayClick}
            aria-label={isCurrentTrack && isPlaying ? 'Pause' : 'Play'}
          >
            {isCurrentTrack && isPlaying ? (
              <svg 
                className="track-card-play-icon" 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="currentColor"
              >
                <rect x="6" y="4" width="4" height="16" />
                <rect x="14" y="4" width="4" height="16" />
              </svg>
            ) : (
              <svg 
                className="track-card-play-icon" 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="currentColor"
              >
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            )}
          </button>
          <button 
            className={`track-card-like-button ${isLiked(track.id) ? 'liked' : ''}`}
            onClick={handleLikeClick}
            aria-label={isLiked(track.id) ? 'Remove from liked songs' : 'Add to liked songs'}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill={isLiked(track.id) ? 'currentColor' : 'none'}
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>
        </div>
      </div>
      <div className="track-card-info">
        <p className="track-card-title" title={track.name}>{track.name}</p>
        <p className="track-card-artist" title={artistName}>{artistName}</p>
      </div>
    </div>
  );
};

export default TrackCard;