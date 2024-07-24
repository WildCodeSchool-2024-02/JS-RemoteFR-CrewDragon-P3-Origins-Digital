import { useEffect, useContext, useState } from "react";
import { useLoaderData, Link } from "react-router-dom";
import YouTube from "react-youtube";
import fleche from "../assets/images/fleche.png";
import { AuthContext } from "../contexte/AuthContext";
import "../style/Contenue.scss";

function Contenue() {
  const videos = useLoaderData();
  const { abonnementId } = useContext(AuthContext);

  const [limiteVideo, setLimiteVideo] = useState(6);

  const handleVoirPlus = () => {
    setLimiteVideo((precLimiteVideos) => precLimiteVideos + 6);
    setTimeout(() => {
      window.scrollBy({
        top: window.innerHeight,
        behavior: "smooth",
      });
    }, 50);
  };

  const firstPage = videos.slice(0, limiteVideo);

  useEffect(() => {
    window.scrollBy({
      top: window.innerHeight,
      behavior: "smooth",
    });
  }, []);

  return (
    <>
      <div className="AllVideos">
        {firstPage.map((video) => {
          const hasAccess =
            abonnementId === 2 ||
            (abonnementId === 1 && video.abonnementsid === 1) ||
            (!abonnementId && video.abonnementsid === 1); // Allow non-authenticated users to see only videos with abonnementsid 1

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

export default Contenue;
