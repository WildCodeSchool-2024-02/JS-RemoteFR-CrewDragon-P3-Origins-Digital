import { useState } from "react";
import { useLoaderData, Link } from "react-router-dom";
import axios from "axios";

function FormUser() {
  const { users, roles, abonnements } = useLoaderData();

  const [deleteUser, setDeleteUser] = useState(users);
  const [selectedRoles, setSelectedRoles] = useState(
    users.reduce((acc, user) => {
      acc[user.id] = user.roles_id;
      return acc;
    }, {})
  );
  const [selectedAbonnements, setSelectedAbonnements] = useState(
    users.reduce((acc, user) => {
      acc[user.id] = user.abonnementsid;
      return acc;
    }, {})
  );

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/users/${userId}`);
      setDeleteUser(deleteUser.filter(user => user.id !== userId));
    } catch (error) {
      console.error("Erreur lors de la suppression de l'utilisateur", error);
    }
  };

  const handleUpdateUser = async (e, userId) => {
    e.preventDefault();
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/api/users/${userId}`, {
        roles_id: selectedRoles[userId],
        abonnementsid: selectedAbonnements[userId],
      });
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'utilisateur", error);
    }
  };

  return (
    <div>
      <div className="sideadmin">
        <ul>
          <h2>
            Bienvenue <br />
            <span className="admin-color">Admin</span>
          </h2>
          <Link className="admin-link" to="/">
            Accueil
          </Link>
          <Link className="admin-link" to="/categories">
            Catégories
          </Link>
          <Link className="admin-link" to="/admin">
            Gérer mes vidéos
          </Link>
          <Link className="admin-link" to="/admin/catsouscats">
            Gérer mes Catégories et Sous-catégories
          </Link>
          <Link className="admin-link" to="/admin/utilisateurs">
            Gérer les utilisateurs
          </Link>
          <Link className="admin-link" to="/contenu">
            Contenu
          </Link>
          <Link className="admin-link" to="/login">
            Déconnexion
          </Link>
        </ul>
      </div>
      {deleteUser.map((user) => (
        <form key={user.id} onSubmit={(e) => handleUpdateUser(e, user.id)}>
          <p>{user.lastname}</p>
          <p>{user.firstname}</p>
          <label>
            Choisissez un rôle : <br />
            <select
              value={selectedRoles[user.id]}
              onChange={(e) =>
                setSelectedRoles({
                  ...selectedRoles,
                  [user.id]: e.target.value,
                })
              }
            >
              {roles.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.name}
                </option>
              ))}
            </select>
          </label>
          {selectedRoles[user.id] !== user.roles_id && (
            <button type="submit">Modifier</button>
          )}
          <label>
            Choisissez un abonnement : <br />
            <select
              value={selectedAbonnements[user.id]}
              onChange={(e) =>
                setSelectedAbonnements({
                  ...selectedAbonnements,
                  [user.id]: e.target.value,
                })
              }
            >
              {abonnements.map((abonnement) => (
                <option key={abonnement.id} value={abonnement.id}>
                  {abonnement.name}
                </option>
              ))}
            </select>
          </label>
          {selectedAbonnements[user.id] !== user.abonnementsid && (
            <button type="submit">Modifier</button>
          )}
          <button
            type="button"
            onClick={() => handleDeleteUser(user.id)}
          >
            Supprimer
          </button>
        </form>
      ))}
    </div>
  );
}

export default FormUser;
