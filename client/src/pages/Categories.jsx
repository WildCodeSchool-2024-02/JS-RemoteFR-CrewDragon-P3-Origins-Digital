import "../style/Categories.scss";

function Categories() {
  return (
    <>
      <h1>
        Veuillez choisir une <span>catégorie</span>
      </h1>
      <div className="layout">
        <div className="image-container">
          <div className="overlay-text">Sport</div>
        </div>

        <div className="image-container2">
          <div className="overlay-text">Actualité</div>
        </div>

        <div className="image-container3">
          <div className="overlay-text">Technologie</div>
        </div>

        <div className="image-container4">
          <div className="overlay-text">Junior</div>
        </div>
      </div>
    </>
  );
}
export default Categories;
