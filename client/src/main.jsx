import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Import du Composant App

import App from "./App";

// Import des pages

import Home from "./pages/Home";
import Categories from "./pages/Categories";
import SousCategories from "./pages/SousCategories";
import Contenue from "./pages/Contenue";
import Admin from "./pages/Admin";
import Error404 from "./pages/Error404";

// router creation

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/Categories",
        element: <Categories />,
      },
      {
        path: "/SousCategories",
        element: <SousCategories />,
      },
      {
        path: "/Contenue",
        element: <Contenue />,
      },
      {
        path: "/Admin",
        element: <Admin />,
      },
      {
        path: "/error404",
        element: <Error404 />,
      },
    ],
  },
]);

// rendering

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
