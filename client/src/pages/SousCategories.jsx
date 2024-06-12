/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import YouTube from "react-youtube";
import Slider from "react-slick";
import categoriesData from "../Data/CategorieData";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function SousCategories() {
  const { categoryName } = useParams();
  const [selectedSousCategorie, setSelectedSousCategorie] = useState(null);
  const [subCategories, setSubCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    window.scrollBy({
      top: window.innerHeight,
      behavior: "smooth",
    });

    const category = categoriesData.find(
      (cat) => cat.name.toLowerCase() === categoryName.toLowerCase()
    );
    if (category) {
      setSelectedCategory(category);
      if (category.sousCategorie) {
        setSelectedSousCategorie(category.sousCategorie[0]);
        setSubCategories(category.sousCategorie);
      }
    }
  }, [categoryName]);

  const settings = {
    arrows: false,
    dots: false,
    infinite: true,
    fade: true,
    adaptiveHeight: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const opts = {
    playerVars: {
      autoplay: 0,
    },
  };

  return (
    <>
      <h1>{selectedCategory ? selectedCategory.name : "Chargement..."}</h1>

      {subCategories.map((sousCategorie) => (
        <div key={sousCategorie.id}>
          <h2>{sousCategorie.name}</h2>
          <Slider {...settings}>
            {sousCategorie.video1 && (
              <div key={sousCategorie.video1}>
                <YouTube
                  videoId={sousCategorie.video1.split("v=")[1]}
                  opts={opts}
                />
                <button type="button">voir plus</button>
              </div>
            )}
            {sousCategorie.video2 && (
              <div key={sousCategorie.video2}>
                <YouTube
                  videoId={sousCategorie.video2.split("v=")[1]}
                  opts={opts}
                />
                <button type="button">voir plus</button>
              </div>
            )}
            {sousCategorie.video3 && (
              <div key={sousCategorie.video3}>
                <YouTube
                  videoId={sousCategorie.video3.split("v=")[1]}
                  opts={opts}
                />
                <button type="button">voir plus</button>
              </div>
            )}
          </Slider>
        </div>
      ))}
    </>
  );
}

export default SousCategories;
