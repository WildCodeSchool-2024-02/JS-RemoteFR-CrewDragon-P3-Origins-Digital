import React from "react";
import YouTube from "react-youtube";
import HomepageData from "../Data/HomePageData";

function Home() {
  const opts = { height: "380", width: "380" };
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

      {HomepageData.map((video, index) => (
        <div key={index} className="player-container">
          <h2>{video.title}</h2>

          <YouTube
            className="player-home"
            videoId={video.url.split("=")[1]}
            opts={opts}
          />
          <div className="description-container">
            <p className="description">{video.description}</p>
          </div>
        </div>
      ))}
    </>
  );
}

export default Home;
