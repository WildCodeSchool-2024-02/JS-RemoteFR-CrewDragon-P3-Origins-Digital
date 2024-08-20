import { useEffect, useContext, useState } from "react";
import { useLoaderData, Link } from "react-router-dom";
import YouTube from "react-youtube";
import fleche from "../assets/images/fleche.png";
import { AuthContext } from "../contexte/AuthContext";
import "../style/Contenu.scss";

function Contenu() {
  const videos = useLoaderData();
  const { abonnementId } = useContext(AuthContext);

  const [searchTerm, setSearchTerm] = useState("");
  const [limiteVideo, setLimiteVideo] = useState(6);
  const [randomVideos, setRandomVideos] = useState([]);

  // Fonction pour mélanger un tableau
  const shuffleArray = (inputArray) => {
    const array = [...inputArray]; // Create a copy of the array
    for (let i = array.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  useEffect(() => {
    // Mélanger les vidéos une fois lors du chargement du composant
    setRandomVideos(shuffleArray([...videos]));
  }, [videos]);

  // Filtrage des vidéos en fonction du terme de recherche
  const filteredVideos = randomVideos.filter((video) => {
    const lowerSearchTerm = searchTerm.toLowerCase();
    return (
      video.title.toLowerCase().includes(lowerSearchTerm) ||
      video.description.toLowerCase().includes(lowerSearchTerm) ||
      video.categories.name.toLowerCase().includes(lowerSearchTerm) ||
      video.souscats.name.toLowerCase().includes(lowerSearchTerm)
    );
  });

  const firstPage = filteredVideos.slice(0, limiteVideo);

  const handleVoirPlus = () => {
    setLimiteVideo((precLimiteVideos) => precLimiteVideos + 6);
    setTimeout(() => {
      window.scrollBy({
        top: window.innerHeight,
        behavior: "smooth",
      });
    }, 50);
  };

  useEffect(() => {
    window.scrollBy({
      top: window.innerHeight,
      behavior: "smooth",
    });
  }, []);

  return (
    <>
      <div className="search-contenu-container">
        <input
          type="text"
          placeholder="Rechercher une vidéo..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="AllVideos">
        {firstPage.map((video) => {
          const hasAccess =
            abonnementId === 2 ||
            (abonnementId === 1 && video.abonnementsid === 1) ||
            (!abonnementId && video.abonnementsid === 1);

          return (
            <div key={video.id} className="videoItem">
              <div
                className={`videoContainer ${hasAccess ? "" : "restricted"}`}
              >
                <YouTube
                  videoId={video.url.split("v=")[1]}
                  opts={{ autoplay: 0, width: "500", height: "400" }}
                  onPlay={(event) => {
                    if (!hasAccess) {
                      event.target.pauseVideo();
                    }
                  }}
                />
                <div className="blocDetails">
                  <div className="infosVideo">
                    <p>{video.title}</p>
                  </div>
                  <Link
                    to={`/video/${video.url.split("v=")[1]}`}
                    state={{
                      title: video.title,
                      description: video.description,
                      date: video.date,
                      duration: video.duration,
                      categories: video.name,
                      abonnementsid: video.abonnementsid,
                    }}
                  >
                    <button type="button">Détails</button>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="voirPlus">
        <p>Voir plus</p>
        <button className="buttonVP" type="button" onClick={handleVoirPlus}>
          <img src={fleche} alt="voir plus" />
        </button>
      </div>
    </>
  );
}

export default Contenu;
