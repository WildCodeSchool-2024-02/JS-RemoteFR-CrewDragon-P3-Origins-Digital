import Cookies from "js-cookie";
import { createContext, useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";

export const AuthContext = createContext();

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
  const [rolesId, setRolesId] = useState(null);
  const [abonnementId, setAbonnementId] = useState(null);

  useEffect(() => {
    const token = Cookies.get("token"); // Lire le token depuis le cookie
    if (token) {
      const decodedToken = decodeToken(token);
      if (decodedToken) {
        setIsAuthenticated(true);
        setRolesId(decodedToken.rolesId);
        setAbonnementId(decodedToken.abonnementId);
      }
    }
  }, []);

  const login = (token) => {
    const decodedToken = decodeToken(token);
    if (decodedToken) {
      Cookies.set("token", token, { expires: 1, secure: true }); // Stocker le token dans le cookie
      setIsAuthenticated(true);
      setRolesId(decodedToken.rolesId);
      setAbonnementId(decodedToken.abonnementId);
    }
  };

  const logout = () => {
    Cookies.remove("token"); // Supprimer le token du cookie
    setIsAuthenticated(false);
    setRolesId(null);
    setAbonnementId(null);
  };

  const authContextValue = useMemo(() => {
    const isAdmin = () => rolesId === 1;

    const hasAccessToVideo = (videoAbonnementId) =>
      abonnementId === 2 || (abonnementId === 1 && videoAbonnementId === 1);

    return {
      isAuthenticated,
      rolesId,
      abonnementId,
      isAdmin,
      login,
      logout,
      hasAccessToVideo,
    };
  }, [isAuthenticated, rolesId, abonnementId]);

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
