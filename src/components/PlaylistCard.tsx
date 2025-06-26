import React from 'react';
import '../css/playlist-card.css';
import { Playlist, getImageUrl } from '../services/api';

interface PlaylistCardProps {
  playlist: Playlist;
}

const PlaylistCard: React.FC<PlaylistCardProps> = ({ playlist }) => {
  const imageUrl = getImageUrl(playlist.images);

  return (
    <div className="playlist-card">
      <div className="playlist-card-image-container">
        <img 
          className="playlist-card-image" 
          src={imageUrl} 
          alt={playlist.name}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/default-playlist-cover.jpg';
          }}
        />
        <div className="playlist-overlay">
          <button className="playlist-card-play-button">
            <svg 
              className="playlist-card-play-icon" 
              xmlns="http://www.w3.org/2000/svg" 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="currentColor"
            >
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          </button>
        </div>
      </div>
      <div className="playlist-card-info">
        <p className="playlist-card-title" title={playlist.name}>{playlist.name}</p>
        <p className="playlist-card-description" title={playlist.description}>
          {playlist.description || `By ${playlist.owner.display_name}`}
        </p>
      </div>
    </div>
  );
};

export default PlaylistCard;