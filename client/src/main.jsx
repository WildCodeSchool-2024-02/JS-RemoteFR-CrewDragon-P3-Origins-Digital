import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  redirect,
} from "react-router-dom";
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
          const response = await axios.get(`http://localhost:3310/api/videos`);
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
          const response = await axios.get(`http://localhost:3310/api/videos/`);
          return response.data;
        },
        action: async ({ request, params }) => {
          const formData = await request.formData();

          switch (request.method.toLowerCase()) {
            case "post": {
              await axios.post(`http://localhost:3310/api/videos/`, {
                title: formData.get("title"),
                description: formData.get("description"),
                url: formData.get("url"),
                date: formData.get("date"),
                grille: 0,
                hero: 0,
                carouStatique: 0,
                carouDynamique: 0,
                freemium: 0,
                miniature: formData.get("miniature"),
              });

              return redirect(`http://localhost:3000/Admin/`);
            }
            case "delete": {
              await axios.delete(
                `http://localhost:3310/api/videos/${params.id}`
              );

              return redirect("http://localhost:3000/Admin/");
            }
            default:
              throw new Response("", { status: 405 });
          }
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
    ],
  },
]);

// rendering

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
