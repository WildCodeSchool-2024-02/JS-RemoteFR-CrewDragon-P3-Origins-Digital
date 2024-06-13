import { useEffect } from "react";
import YouTube from "react-youtube";
import categoriesData from "../Data/CategorieData";

import "../style/Contenue.scss";

function Contenue() {
  useEffect(() => {
    window.scrollBy({
      top: window.innerHeight,
      behavior: "smooth",
    });
  }, []);

  const allVideos = categoriesData.flatMap((category) =>
    category.sousCategorie.flatMap((sousCategorie) => [
      sousCategorie.video1,
      sousCategorie.video2,
      sousCategorie.video3,
    ])
  );

  return (
    <div className="AllVideos">
      {allVideos.map((video) => (
        <div key={video}>
          <YouTube
            videoId={video.split("v=")[1]}
            opts={{ autoplay: 0, width: "500", height: "400" }}
          />
          <div className="blocDetails">
            <div className="infosVideo">
              <p>Nom de la vidéo</p>
              <p>Durée de la vidéo</p>
            </div>
            <button type="button">Détails</button>
          </div>
        </div>
      ))}
      <div>
        <button className="voirPlus" type="button">
          Voir plus
        </button>
      </div>
    </div>
  );
}

export default Contenue;
