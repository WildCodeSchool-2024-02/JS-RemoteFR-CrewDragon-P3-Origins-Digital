/* eslint-disable react/jsx-props-no-spreading */
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import YouTube from "react-youtube";
import Slider from "react-slick";
import categoriesData from "../Data/CategorieData";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function SousCategories() {
  const { categoryName } = useParams();
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
        setSubCategories(category.sousCategorie);
      }
    }
  }, [categoryName]);

  const settings = {
    arrows: true,
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
      <h1 className="title-h1">
        {selectedCategory ? selectedCategory.name : "Chargement..."}
      </h1>
      {subCategories.map((sousCategorie) => (
        <div key={sousCategorie.id}>
          <h2 className="title-sous-categorie">{sousCategorie.name}</h2>
          <Slider {...settings}>
            {sousCategorie.video1 && (
              <div key={sousCategorie.video1}>
                <YouTube
                  className="container-sous-categorie"
                  videoId={sousCategorie.video1.split("v=")[1]}
                  opts={opts}
                />
                <div className="button-container">
                  <Link to={`/video/${sousCategorie.video1.split("v=")[1]}`}>
                    <button className="button-style" type="button">
                      voir plus
                    </button>
                  </Link>
                </div>
              </div>
            )}
            {sousCategorie.video2 && (
              <div key={sousCategorie.video2}>
                <YouTube
                  className="container-sous-categorie"
                  videoId={sousCategorie.video2.split("v=")[1]}
                  opts={opts}
                />
                <div className="button-container">
                  <Link to={`/video/${sousCategorie.video2.split("v=")[1]}`}>
                    <button className="button-style" type="button">
                      voir plus
                    </button>
                  </Link>
                </div>
              </div>
            )}
            {sousCategorie.video3 && (
              <div key={sousCategorie.video3}>
                <YouTube
                  className="container-sous-categorie"
                  videoId={sousCategorie.video3.split("v=")[1]}
                  opts={opts}
                />
                <div className="button-container">
                  <Link to={`/video/${sousCategorie.video3.split("v=")[1]}`}>
                    <button className="button-style" type="button">
                      voir plus
                    </button>
                  </Link>
                </div>
              </div>
            )}
          </Slider>
        </div>
      ))}
    </>
  );
}

export default SousCategories;
