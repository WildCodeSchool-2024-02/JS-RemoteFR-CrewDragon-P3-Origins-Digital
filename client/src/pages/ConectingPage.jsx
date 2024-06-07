import { useEffect } from "react";

function ConnectingPage() {
  useEffect(() => {
    window.scrollBy({
      top: window.innerHeight,
      behavior: "smooth",
    });
  }, []);
  return <h1>Viens t'enregistrer</h1>;
}

export default ConnectingPage;
