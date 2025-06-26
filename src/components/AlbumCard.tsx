import React from 'react';
import '../css/album-card.css';
import { Album, getImageUrl } from '../services/api';

interface AlbumCardProps {
  album: Album;
}

const AlbumCard: React.FC<AlbumCardProps> = ({ album }) => {
  const imageUrl = getImageUrl(album.images);
  const artistName = album.artists && album.artists.length > 0 ? album.artists[0].name : 'Unknown Artist';

  return (
    <div className="album-card">
      <div className="album-card-image-container">
        <img 
          className="album-card-image" 
          src={imageUrl} 
          alt={album.name}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/default-album-cover.jpg';
          }}
        />
        <div className="album-overlay">
          <button className="album-card-play-button">
            <svg 
              className="album-card-play-icon" 
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
      <div className="album-card-info">
        <p className="album-card-title" title={album.name}>{album.name}</p>
        <p className="album-card-artist" title={artistName}>{artistName}</p>
        <p className="album-card-year">{new Date(album.release_date).getFullYear()}</p>
      </div>
    </div>
  );
};

export default AlbumCard;