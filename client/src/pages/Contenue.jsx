import { useEffect, useContext } from "react";
import { useLoaderData, Link } from "react-router-dom";
import YouTube from "react-youtube";
import fleche from "../assets/images/fleche.png";
import { AuthContext } from "../contexte/AuthContext";
import "../style/Contenue.scss";

function Contenue() {
  const videos = useLoaderData();
  const { hasAccessToVideo } = useContext(AuthContext);

  useEffect(() => {
    window.scrollBy({
      top: window.innerHeight,
      behavior: "smooth",
    });
  }, []);

  return (
    <>
      <div className="AllVideos">
        {videos.map((video) => {
          const hasAccess = hasAccessToVideo(video.id);
          return hasAccess ? (
            <div key={video.id}>
              <YouTube
                videoId={video.url.split("v=")[1]}
                opts={{ autoplay: 0, width: "500", height: "400" }}
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
          ) : null;
        })}
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
