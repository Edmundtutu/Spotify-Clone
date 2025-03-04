import TrackCard from "../components/TrackCard";
import '../css/liked-songs.css';

const LikedSongs = () => {
  const recommendedTracks = [
    { id: 1, title: "Ekyange", artist: "Elihja Kitaka", url: "" },
    { id: 2, title: "Ndi wuwo", artist: "Kenneth Mugabi", url: "" },
    { id: 3, title: "Nkwegomba", artist: "Elihja Kitaka", url: "" },
    { id: 4, title: "Perfect", artist: "Ed Sheeran", url: "" },
    { id: 5, title: "Hozambe", artist: "Rick", url: "" }
  ];

  return (
    <div className="liked-songs-container">
      <div className="liked-songs-header">
        <h1 className="liked-songs-title">Liked Songs</h1>
        <p className="liked-songs-subtitle">Your personal collection</p>
      </div>
      
      <div className="liked-songs-empty">
        <div className="liked-songs-empty-icon">♡</div>
        <h2 className="liked-songs-empty-title">No liked songs yet</h2>
        <p className="liked-songs-empty-message">Check out these recommendations</p>
        <button className="liked-songs-empty-button">Browse music</button>
      </div>
      
      <div className="recommendations-section">
        <h2 className="recommendations-title">Recommended for you</h2>
        <div className="recommendations-grid">
          {recommendedTracks.length !== 0 &&
            recommendedTracks.map(track =>
              <TrackCard
                title={track.title}
                url={track.url}
                artist={track.artist}
                key={track.id}
              />
            )}
        </div>
      </div>
    </div>
  );
};

export default LikedSongs;
