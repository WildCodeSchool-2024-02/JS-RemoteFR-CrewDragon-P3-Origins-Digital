import { useParams } from "react-router-dom";
import YouTube from "react-youtube";

function UniqueVideo() {
  const { videoId } = useParams();

  const opts = {
    playerVars: {},
  };

  return (
    <div className="video-container">
      <YouTube videoId={videoId} opts={opts} />
    </div>
  );
}

export default UniqueVideo;
