import { useEffect, useState } from "react";
import { useLoaderData, Link } from "react-router-dom";
import YouTube from "react-youtube";
import fleche from "../assets/images/fleche.png";

import "../style/Contenue.scss";

function Contenue() {
  const videos = useLoaderData();
  useEffect(() => {
    window.scrollBy({
      top: window.innerHeight,
      behavior: "smooth",
    });
  }, []);

  const [limiteVideo, setLimiteVideo] = useState(9);

    const handleVoirPlus = () => {
      setLimiteVideo((precLimiteVideos) => precLimiteVideos + 9)
      ;
     setTimeout(() => {
       window.scrollBy({
         top: window.innerHeight, 
         behavior: "smooth",
       });
     }, 50);
    };


  const firstPage = videos.slice(0,limiteVideo);



  return (
    <>
      <div className="AllVideos">
        {firstPage.map((video) => (
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
        ))}
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
