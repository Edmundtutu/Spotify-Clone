import TrackCard from "../components/TrackCard";
import { useState } from "react";
import '../css/home.css';

const Home = () => {
  const tracks = [
    { id: 1, title: "Do do", artist: "Jp Cooper", url: "" },
    { id: 2, title: "Ca boom", artist: "Cat Burns", url: "" },
    { id: 3, title: "Ndi wuwo", artist: "Elihja Kitaka", url: "" },
    { id: 4, title: "Lofit", artist: "Azawi", url: "" },
    { id: 5, title: "Jelengesa", artist: "Navio", url: "" }
  ];
 
  function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  const [searchQuery, setSearchQuery] = useState("");

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
        <div className="tracks-grid">
          {tracks.map(
            track =>
              track.title.toLowerCase().startsWith(searchQuery) &&
              <TrackCard
                title={track.title}
                url={track.url || "/default-album-cover.jpg"}
                artist={track.artist}
                key={track.id}
              />
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
