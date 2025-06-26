import React from 'react';
import TrackList from '../components/TrackList';
import TrackCard from '../components/TrackCard';
import '../css/liked-songs.css';
import { useLikedSongs } from '../hooks/useLikedSongs';
import { getRecommendations, Track } from '../services/api';
import { useState, useEffect } from 'react';

const LikedSongs: React.FC = () => {
  const { likedSongs } = useLikedSongs();
  const [recommendations, setRecommendations] = useState<Track[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (likedSongs.length === 0) {
      loadRecommendations();
    }
  }, [likedSongs.length]);

  const loadRecommendations = async () => {
    try {
      setLoading(true);
      const seedTracks = likedSongs.length > 0 
        ? likedSongs.slice(0, 5).map(track => track.id)
        : undefined;
      
      const recommendedTracks = await getRecommendations(seedTracks);
      setRecommendations(recommendedTracks);
    } catch (error) {
      console.error('Failed to load recommendations:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="liked-songs-page">
      <div className="liked-songs-header">
        <div className="liked-songs-hero">
          <div className="liked-songs-icon">
            <svg width="80" height="80" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </div>
          <div className="liked-songs-info">
            <span className="liked-songs-type">Playlist</span>
            <h1 className="liked-songs-title">Liked Songs</h1>
            <div className="liked-songs-meta">
              <span>{likedSongs.length} songs</span>
            </div>
          </div>
        </div>
      </div>

      <div className="liked-songs-content">
        {likedSongs.length > 0 ? (
          <>
            <div className="liked-songs-actions">
              <button className="play-all-button">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
                Play All
              </button>
            </div>
            <TrackList tracks={likedSongs} showAlbum={true} showIndex={true} />
          </>
        ) : (
          <div className="liked-songs-empty">
            <div className="liked-songs-empty-icon">
              <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </div>
            <h2 className="liked-songs-empty-title">Songs you like will appear here</h2>
            <p className="liked-songs-empty-message">
              Save songs by tapping the heart icon.
            </p>
            <button 
              className="liked-songs-empty-button"
              onClick={() => window.location.href = '/'}
            >
              Find something to like
            </button>
          </div>
        )}

        {recommendations.length > 0 && (
          <section className="recommendations-section">
            <h2 className="recommendations-title">
              {likedSongs.length > 0 ? 'More like what you love' : 'Recommended for you'}
            </h2>
            {loading ? (
              <div className="loading-container">
                <div className="loading-spinner"></div>
              </div>
            ) : (
              <div className="recommendations-grid">
                {recommendations.map((track) => (
                  <TrackCard 
                    key={track.id} 
                    track={track} 
                    playlist={recommendations}
                  />
                ))}
              </div>
            )}
          </section>
        )}
      </div>
    </div>
  );
};

export default LikedSongs;