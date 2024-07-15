// AuthContext.jsx
import { createContext, useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";

export const AuthContext = createContext();

// Fonction pour décoder le token JWT
const decodeToken = (token) => {
  try {
    const decoded = JSON.parse(atob(token.split(".")[1]));
    return decoded;
  } catch (error) {
    console.error("Erreur lors du décodage du token :", error);
    return null;
  }
};

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null); // État pour le rôle de l'utilisateur

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = decodeToken(token);
      if (decodedToken) {
        setIsAuthenticated(true);
        setUserRole(decodedToken.roles_id); // Utilisation du roles_id extrait du token
      }
    }
  }, []);

  // Fonction de connexion
  const login = (token) => {
    const decodedToken = decodeToken(token);
    if (decodedToken) {
      localStorage.setItem("token", token);
      setIsAuthenticated(true);
      setUserRole(decodedToken.roles_id);
    }
  };

  // Fonction de déconnexion
  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setUserRole(null);
  };

  // Fonction pour vérifier si l'utilisateur est administrateur
  const isAdmin = () => isAuthenticated && userRole === 1;

  // Valeur du contexte d'authentification
  const authContextValue = useMemo(
    () => ({
      isAuthenticated,
      userRole,
      isAdmin,
      login,
      logout,
    }),
    [isAuthenticated, userRole, isAdmin, login] // Ajouter les dépendances manquantes ici
  );

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
