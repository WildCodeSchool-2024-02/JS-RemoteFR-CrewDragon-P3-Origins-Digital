import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Import du Composant App

import App from "./App";

// Import des pages

import Home from "./pages/Home";
import Categories from "./pages/Categories";
import SousCategories from "./pages/SousCategories";
import Contenue from "./pages/Contenue";
import VideoUnique from "./pages/UniqueVideo";
import Admin from "./pages/Admin";
import Error404 from "./pages/Error404";
import Login from "./pages/Login";
import Account from "./pages/Account";
import Contact from "./pages/Contact";
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
        path: "/:categories/:categoryName",
        element: <SousCategories />,
      },
      {
        path: "/Contenue",
        element: <Contenue />,
      },
      {
        path: "/video/:videoId",
        element: <VideoUnique />,
      },
      {
        path: "/Admin",
        element: <Admin />,
      },
      {
        path: "/Login",
        element: <Login />,
      },
      {
        path: "/Account",
        element: <Account />,
      },
      {
        path: "/*",
        element: <Error404 />,
      },
      {
        path: "/Contact",
        element: <Contact />,
      },
    ],
  },
]);

// rendering

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
