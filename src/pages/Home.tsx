import React, { useState, useEffect } from 'react';
import TrackCard from '../components/TrackCard';
import PlaylistCard from '../components/PlaylistCard';
import AlbumCard from '../components/AlbumCard';
import '../css/home.css';
import { 
  getPopularTracks, 
  searchTrack, 
  getFeaturedPlaylists, 
  getNewReleases,
  Track, 
  Playlist, 
  Album 
} from '../services/api';

const Home: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [tracks, setTracks] = useState<Track[]>([]);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [newReleases, setNewReleases] = useState<Album[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchResults, setSearchResults] = useState<Track[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    loadHomeData();
  }, []);

  const loadHomeData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [popularTracks, featuredPlaylists, albums] = await Promise.all([
        getPopularTracks(),
        getFeaturedPlaylists(),
        getNewReleases()
      ]);
      
      setTracks(popularTracks);
      setPlaylists(featuredPlaylists);
      setNewReleases(albums);
    } catch (err) {
      console.error('Error loading home data:', err);
      setError('Failed to load content. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (searchQuery.trim()) {
      setIsSearching(true);
      setError(null);
      
      try {
        const results = await searchTrack(searchQuery);
        setSearchResults(results);
      } catch (err) {
        console.error('Search error:', err);
        setError('Failed to search tracks. Please try again.');
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    } else {
      setSearchResults([]);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
  };

  if (loading) {
    return (
      <div className="home-loading">
        <div className="loading-spinner"></div>
        <p className="text-lg text-secondary">Loading your music...</p>
      </div>
    );
  }

  return (
    <div className="home">
      <div className="search-section">
        <form onSubmit={handleSearch} className="search-form">
          <div className="search-input-container">
            <input
              type="text"
              placeholder="What do you want to listen to?"
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button 
                type="button" 
                className="search-clear-button"
                onClick={clearSearch}
                aria-label="Clear search"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
                </svg>
              </button>
            )}
          </div>
          <div className="search-button-container">
            <button type="submit" className="search-button" disabled={isSearching}>
              {isSearching ? (
                <>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" style={{ marginRight: '8px', animation: 'spin 1s linear infinite' }}>
                    <path d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z"/>
                    <path d="M8 4a4 4 0 0 1 4 4H8V4z"/>
                  </svg>
                  Searching...
                </>
              ) : (
                <>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" style={{ marginRight: '8px' }}>
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                  </svg>
                  Search
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {error && (
        <div className="error-message">
          <p>{error}</p>
          <button onClick={loadHomeData} className="retry-button">
            Try Again
          </button>
        </div>
      )}

      {searchResults.length > 0 ? (
        <section className="search-results-section">
          <div className="section-header">
            <h2 className="section-title">Search Results</h2>
            <button onClick={clearSearch} className="clear-search-button">
              Clear Results
            </button>
          </div>
          <div className="tracks-grid">
            {searchResults.map((track) => (
              <TrackCard 
                key={track.id} 
                track={track} 
                playlist={searchResults}
              />
            ))}
          </div>
        </section>
      ) : (
        <>
          <section className="popular-tracks-section">
            <h2 className="section-title">Popular Right Now</h2>
            <div className="tracks-grid">
              {tracks.map((track) => (
                <TrackCard 
                  key={track.id} 
                  track={track} 
                  playlist={tracks}
                />
              ))}
            </div>
          </section>

          <section className="featured-playlists-section">
            <h2 className="section-title">Featured Playlists</h2>
            <div className="playlists-grid">
              {playlists.map((playlist) => (
                <PlaylistCard key={playlist.id} playlist={playlist} />
              ))}
            </div>
          </section>

          <section className="new-releases-section">
            <h2 className="section-title">New Releases</h2>
            <div className="albums-grid">
              {newReleases.map((album) => (
                <AlbumCard key={album.id} album={album} />
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default Home;