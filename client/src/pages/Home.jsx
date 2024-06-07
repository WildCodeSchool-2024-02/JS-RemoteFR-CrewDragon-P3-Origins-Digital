import { Link } from "react-router-dom";
import YouTube from "react-youtube";
import HomepageData from "../Data/HomePageData";

function Home() {
  const opts = {
    playerVars: {
      autoplay: 0,
    },
  };

  return (
    <>
      <div className="intro-container">
        <p>
          <strong>Origin Digital</strong> est votre nouvelle plateforme dédiée à
          la découverte et au partage de vidéos captivantes et inspirantes,
          directement issues de YouTube.
        </p>
        <br />
        <p>
          Notre mission est de vous offrir un espace convivial et intuitif pour
          explorer une variété de contenus vidéo sélectionnés avec soin. Voici
          ce que vous trouverez sur notre site :
        </p>
      </div>

      {HomepageData.map((video) => (
        <div key={video.id} className="player-container">
          <h2>{video.title}</h2>
          <div className="player-wrapper">
            <YouTube
              className="player-home"
              videoId={video.url1.split("=")[1]}
              opts={opts}
            />
          </div>
          <Link to="/Connectingpage" className="seemore">
            Voir Plus
          </Link>
          <div className="description-container">
            <p className="description">{video.description}</p>
          </div>
        </div>
      ))}
    </>
  );
}

export default Home;
