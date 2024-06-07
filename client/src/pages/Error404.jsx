import { useEffect } from "react";

function Error404() {
  useEffect(() => {
    window.scrollBy({
      top: window.innerHeight,
      behavior: "smooth",
    });
  }, []);
  return <h1>HelloError404</h1>;
}

export default Error404;
