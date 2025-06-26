import React from 'react';
import '../css/track-list.css';
import { Track, formatDuration, getImageUrl } from '../services/api';
import { useMusicContext } from '../context/MusicContext';
import { useLikedSongs } from '../hooks/useLikedSongs';

interface TrackListProps {
  tracks: Track[];
  showAlbum?: boolean;
  showIndex?: boolean;
}

const TrackList: React.FC<TrackListProps> = ({ tracks, showAlbum = true, showIndex = true }) => {
  const { playTrack, currentTrack, isPlaying } = useMusicContext();
  const { isLiked, toggleLike } = useLikedSongs();

  const handleTrackClick = (track: Track) => {
    playTrack(track, tracks);
  };

  const handleLikeClick = (e: React.MouseEvent, track: Track) => {
    e.stopPropagation();
    toggleLike(track);
  };

  return (
    <div className="track-list">
      <div className="track-list-header">
        {showIndex && <div className="track-list-header-index">#</div>}
        <div className="track-list-header-title">Title</div>
        {showAlbum && <div className="track-list-header-album">Album</div>}
        <div className="track-list-header-duration">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z"/>
            <path d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5z"/>
          </svg>
        </div>
      </div>
      
      <div className="track-list-body">
        {tracks.map((track, index) => {
          const isCurrentTrack = currentTrack?.id === track.id;
          const artistName = track.artists && track.artists.length > 0 ? track.artists[0].name : 'Unknown Artist';
          const albumImageUrl = getImageUrl(track.album.images);
          
          return (
            <div 
              key={track.id} 
              className={`track-list-item ${isCurrentTrack ? 'active' : ''}`}
              onClick={() => handleTrackClick(track)}
            >
              {showIndex && (
                <div className="track-list-item-index">
                  {isCurrentTrack && isPlaying ? (
                    <div className="playing-indicator">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>
              )}
              
              <div className="track-list-item-title">
                <img 
                  src={albumImageUrl} 
                  alt={track.album.name}
                  className="track-list-item-image"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/default-album-cover.jpg';
                  }}
                />
                <div className="track-list-item-info">
                  <div className="track-list-item-name" title={track.name}>
                    {track.name}
                  </div>
                  <div className="track-list-item-artist" title={artistName}>
                    {artistName}
                  </div>
                </div>
              </div>
              
              {showAlbum && (
                <div className="track-list-item-album" title={track.album.name}>
                  {track.album.name}
                </div>
              )}
              
              <div className="track-list-item-actions">
                <button 
                  className={`track-list-like-button ${isLiked(track.id) ? 'liked' : ''}`}
                  onClick={(e) => handleLikeClick(e, track)}
                  aria-label={isLiked(track.id) ? 'Remove from liked songs' : 'Add to liked songs'}
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="16" 
                    height="16" 
                    viewBox="0 0 24 24" 
                    fill={isLiked(track.id) ? 'currentColor' : 'none'}
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                </button>
                <div className="track-list-item-duration">
                  {formatDuration(track.duration_ms)}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TrackList;