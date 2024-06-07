import { useEffect } from "react";

function SousCategories() {
  useEffect(() => {
    window.scrollBy({
      top: window.innerHeight,
      behavior: "smooth",
    });
  }, []);
  return <h1>Hello world</h1>;
}

export default SousCategories;
