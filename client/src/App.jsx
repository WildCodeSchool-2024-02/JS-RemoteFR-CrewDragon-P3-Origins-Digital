import { Outlet } from "react-router-dom";

// Import des Composants

import Header from "./components/Header";
import Footer from "./components/Footer";

// Import du SCSS

import "./App.scss";

function App() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
