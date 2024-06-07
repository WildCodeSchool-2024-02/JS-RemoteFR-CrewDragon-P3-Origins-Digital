import { useEffect } from "react";

function Admin() {
  useEffect(() => {
    window.scrollBy({
      top: window.innerHeight,
      behavior: "smooth",
    });
  }, []);
  return <h1>Hello World</h1>;
}

export default Admin;
