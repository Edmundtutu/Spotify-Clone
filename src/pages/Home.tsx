import TrackCard from "../components/TrackCard";
import { useState, useEffect } from "react";
import "../css/home.css";
import { getPopularTracks, searchTrack } from "../services/api";
import { Track } from "../services/api.ts";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const [tracks, setTracks] = useState<Track[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    loadPopularTracks();
  }, []);

  function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    
    if (searchQuery.trim()) {
      setloading(true);
      setError(null);
      
      searchTrack(searchQuery)
        .then((results: Track[]) => {
          setTracks(results);
          setloading(false);
        })
        .catch((err: Error) => {
          console.error(err);
          setError("Failed to search tracks. Please try again.");
          setloading(false);
        });
    } else {
      // If search query is empty, load popular tracks again
      loadPopularTracks();
    }
  }
  
  const loadPopularTracks = async () => {
    try {
      setloading(true);
      setError(null);
      const loadedTracks = await getPopularTracks();
      setTracks(loadedTracks);
    } catch (err) {
      console.error(err);
      setError("An error occurred. Please try again later");
    } finally {
      setloading(false);
    }
  };

  return (
    <div className="home">
      <div className="lookup-container">
        <form onSubmit={handleSearch} className="lookup-form">
          <input
            type="text"
            placeholder="What do you want to listen to today?"
            className="lookup-input"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="lookup-button">
            Search
          </button>
        </form>
      </div>

      <h2 className="tracks-heading">Recommended Tracks</h2>

      <div className="tracks-container">
        {loading ? (
          <p>Loading tracks...</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : (
          <div className="tracks-grid">
            {tracks.map(track => (
              <TrackCard
                title={track.name}
                url={track.album.images && track.album.images.length > 0 
                  ? track.album.images[0].url 
                  : "/default-album-cover.jpg"}
                artist={track.artists && track.artists.length > 0 
                  ? track.artists[0].name 
                  : "Unknown Artist"}
                key={track.id}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
