import '../css/track-card.css';

interface SpotifyReasource {
    title:string;
    artist:string;
    url:string;
}

const TrackCard = (someObject: SpotifyReasource) => {
  function onPlayClick() {}

  return (
    <div className="track-card">
      <div className="track-card-image-container">
        <img className="track-card-image" src={someObject.url} alt={someObject.title} />
        <div className="track-overlay">
          <button className="track-card-play-button" onClick={onPlayClick}>
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
          </button>
        </div>
        <p className="track-card-title">{someObject.title}</p>
        <p className="track-card-artist">{someObject.artist}</p>
      </div>
    </div>
  );
};

export default TrackCard;
