const AbstractRepository = require("./AbstractRepository");

class UserRepository extends AbstractRepository {
  constructor() {
    // Appel du constructeur de la classe parent (AbstractRepository)
    // et passe le nom de la table "users" en tant que configuration
    super({ table: "users" });
  }

  // L'opération de création (Create) du CRUD
  async create(user) {
    // Exécute la requête SQL INSERT pour ajouter un nouvel utilisateur dans la table "users"
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (firstname, lastname, birthday, email, hashed_password) VALUES (?, ?, ?, ?, ?)`,
      [
        user.firstname,
        user.lastname,
        user.birthday,
        user.email,
        user.hashedPassword,
      ]
    );

    // Retourne l'ID du nouvel utilisateur inséré
    return result.insertId;
  }

  // L'opération de lecture (Read) du CRUD
  async read(id) {
    // Exécute la requête SQL SELECT pour récupérer un utilisateur spécifique par son ID
    const [rows] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE id = ?`,
      [id]
    );

    // Retourne la première ligne du résultat, qui représente l'utilisateur
    return rows[0];
  }

  // L'opération de lecture (Read All) du CRUD
  async readAll() {
    // Exécute la requête SQL SELECT pour récupérer tous les utilisateurs de la table "users"
    const [rows] = await this.database.query(`SELECT * FROM ${this.table}`);

    // Retourne le tableau d'utilisateurs
    return rows;
  }

  // L'opération de mise à jour (Update) du CRUD pour tous les champs
  async update(user) {
    const [edit] = await this.database.query(
      `update ${this.table} set email =?, hashed_password =?, firstname =?, lastname =?, birthday =?, roles_id =?, abonnementsid =? where id =?`,
      [
        user.email,
        user.hashedPassword,
        user.firstname,
        user.lastname,
        user.birthday,
        user.roles_id,
        user.abonnementsid,
        user.id,
      ]
    );
    return edit;
  }

  // L'opération de mise à jour (Update) du CRUD pour abonnement_id uniquement
  async updateAbonnement(userId, abonnementsid) {
    const [edit] = await this.database.query(
      `UPDATE ${this.table} SET abonnementsid = ? WHERE id = ?`,
      [abonnementsid, userId]
    );
    return edit;
  }

  // L'opération de suppression (Delete) du CRUD
  async delete(id) {
    // Exécute la requête SQL DELETE pour supprimer un utilisateur de la table "users"
    const [destroy] = await this.database.query(
      `DELETE FROM ${this.table} WHERE id = ?`,
      [id]
    );
    return destroy;
  }

  // Méthode supplémentaire pour lire un utilisateur par email avec mot de passe
  async readByEmailWithPassword(email) {
    // Exécute la requête SQL SELECT pour récupérer un utilisateur spécifique par son email
    const [rows] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE email = ?`,
      [email]
    );

    // Retourne la première ligne du résultat, qui représente l'utilisateur
    return rows[0];
  }
}

module.exports = UserRepository;
