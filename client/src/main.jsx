import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import axios from "axios";

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

import Abonnement from "./pages/Abonnement"; //

import Profil from "./pages/Profil";
import ErrorBoundary from "./pages/ErrorBoundary";


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
        loader: async () => {
          const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/videos`
          );
          return response.data;
        },
      },
      {
        path: "/video/:videoId",
        element: <VideoUnique />,
      },
      {
        path: "/Admin",
        element: <Admin />,

        loader: async () => {
          const [videosResponse, categoriesResponse, souscatsResponse] =
            await Promise.all([
              axios.get(`${import.meta.env.VITE_API_URL}/api/videos/`),
              axios.get(`${import.meta.env.VITE_API_URL}/api/categories/`),
              axios.get(`${import.meta.env.VITE_API_URL}/api/souscats/`),
            ]);
          const videos = videosResponse.data;
          const categories = categoriesResponse.data;
          const souscats = souscatsResponse.data;
          return { videos, categories, souscats };
        },
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
      {

        path: "/abo",
        element: <Abonnement />,
},
{
        path: "/Profil/:id",
        element: <Profil />,
        errorElement: <ErrorBoundary />,
        loader: async ({ params }) => {
          const token = localStorage.getItem("token");
          try {
            const response = await axios.get(
              `${import.meta.env.VITE_API_URL}/api/users/${params.id}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            return response.data;
          } catch (error) {
            console.error(error);
            throw error;
          }
        },

      },
    ],
  },
]);

// rendering

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
