import { useEffect } from "react";
import YouTube from "react-youtube";
import categoriesData from "../Data/CategorieData";
import fleche from "../assets/images/fleche.png";

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
    <>
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
              </div>
              <button type="button">Détails</button>
            </div>
          </div>
        ))}
      </div>
      <div className="voirPlus">
        <p>Voir plus</p>
        <button className="buttonVP" type="button">
          <img src={fleche} alt="voir plus" />
        </button>
      </div>
    </>
  );
}

export default Contenue;
