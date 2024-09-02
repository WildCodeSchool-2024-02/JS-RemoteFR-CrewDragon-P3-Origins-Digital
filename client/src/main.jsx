import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

// Import du Composant App
import App from "./App";

// Import des pages
import Home from "./pages/Home";
import Categories from "./pages/Categories";
import SousCategories from "./pages/SousCategories";
import Contenu from "./pages/Contenu";
import VideoUnique from "./pages/UniqueVideo";
import Admin from "./pages/Admin";
import Error404 from "./pages/Error404";
import Login from "./pages/Login";
import Account from "./pages/Account";
import Contact from "./pages/Contact";
import FormCatSousCat from "./components/FormCatSousCat";
import FormUser from "./components/FormUser";
import Abonnement from "./pages/Abonnement";
import Profil from "./pages/Profil";
import ErrorBoundary from "./pages/ErrorBoundary";

// Fonction pour décoder le token JWT
const decodeToken = (token) => {
  try {
    const payload = token.split(".")[1];
    const decoded = JSON.parse(atob(payload));
    return decoded;
  } catch (error) {
    console.error("Erreur lors du décodage du token :", error);
    return null;
  }
};

// Création du routeur
const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/categories",
        element: <Categories />,
      },
      {
        path: "/:categories/:categoryId",
        element: <SousCategories />,
      },
      {
        path: "/contenu",
        element: <Contenu />,
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
        path: "/admin",
        element: <Admin />,
        errorElement: <ErrorBoundary />,
        loader: async () => {
          try {
            const token = Cookies.get("token");
            if (token) {
              const decoded = decodeToken(token);

              if (decoded && decoded.rolesId === 1) {
                const [videosResponse, categoriesResponse, souscatsResponse] =
                  await Promise.all([
                    axios.get(`${import.meta.env.VITE_API_URL}/api/videos/`),
                    axios.get(
                      `${import.meta.env.VITE_API_URL}/api/categories/`
                    ),
                    axios.get(`${import.meta.env.VITE_API_URL}/api/souscats/`),
                  ]);
                const videos = videosResponse.data;
                const categories = categoriesResponse.data;
                const souscats = souscatsResponse.data;
                return { videos, categories, souscats };
              }
              throw new Error("Oups, tu n'as pas les droits le 💯");
            } else {
              throw new Error("Token manquant");
            }
          } catch (error) {
            console.error(error);
            throw error;
          }
        },
      },
      {
        path: "/admin/catsouscats",
        element: <FormCatSousCat />,
        loader: async () => {
          try {
            const [categoriesResponse, souscatsResponse] = await Promise.all([
              axios.get(`${import.meta.env.VITE_API_URL}/api/categories`),
              axios.get(`${import.meta.env.VITE_API_URL}/api/souscats`),
            ]);

            const categories = categoriesResponse.data;
            const souscats = souscatsResponse.data;

            return { categories, souscats };
          } catch (error) {
            console.error(
              "Erreur lors du chargement des catégories et sous-catégories:",
              error
            );
            return { categories: [], souscats: [] }; // Valeurs par défaut en cas d'erreur
          }
        },
      },
      {
        path: "/admin/utilisateurs",
        element: <FormUser />,
        loader: async () => {
          try {
            const [usersResponse, rolesResponse, abonnementsResponse] =
              await Promise.all([
                axios.get(`${import.meta.env.VITE_API_URL}/api/users`),
                axios.get(`${import.meta.env.VITE_API_URL}/api/roles`),
                axios.get(`${import.meta.env.VITE_API_URL}/api/abonnements`),
              ]);

            const users = usersResponse.data;
            const roles = rolesResponse.data;
            const abonnements = abonnementsResponse.data;

            return { users, roles, abonnements };
          } catch (error) {
            console.error("Erreur lors du chargement des infos user", error);
            return { users: [], roles: [], abonnements: [] }; // Valeurs par défaut en cas d'erreur
          }
        },
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/account",
        element: <Account />,
      },
      {
        path: "/*",
        element: <Error404 />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/abo",
        element: <Abonnement />,
      },
      {
        path: "/profil/:id",
        element: <Profil />,
        errorElement: <ErrorBoundary />,
        loader: async ({ params }) => {
          const token = Cookies.get("token");
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

// Rendu de l'application
ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
