import "../style/Categories.scss";
import { Link } from "react-router-dom";

function Categories() {
  return (
    <>
      <h1>
        Veuillez choisir une <span>catégorie</span>
      </h1>
      <div className="layout">
        <Link to="/SousCategories">
          <div className="image-container">
            <div className="overlay-text">Sport</div>
          </div>
        </Link>

        <Link to="/SousCategories">
          <div className="image-container2">
            <div className="overlay-text">Actualité</div>
          </div>
        </Link>

        <Link to="/SousCategories">
          <div className="image-container3">
            <div className="overlay-text">Technologie</div>
          </div>
        </Link>

        <Link to="/SousCategories">
          <div className="image-container4">
            <div className="overlay-text">Junior</div>
          </div>
        </Link>
      </div>
    </>
  );
}
export default Categories;
