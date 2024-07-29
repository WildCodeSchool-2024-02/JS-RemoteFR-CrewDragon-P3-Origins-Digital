const AbstractRepository = require("./AbstractRepository");

class UserRepository extends AbstractRepository {
  constructor() {
    super({ table: "users" });
  }

  async create(user) {
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
    return result.insertId;
  }

  async read(id) {
    const [rows] = await this.database.query(
      `
      SELECT
        u.*,
        JSON_OBJECT(
          'id', a.id,
          'name', a.name,
          'date_de_paiement', a.date_de_paiement,
          'date_de_fin', a.date_de_fin
        ) as abonnements
      FROM ${this.table} u
      LEFT JOIN abonnements a ON a.id = u.abonnementsid
      WHERE u.id = ?
    `,
      [id]
    );
    return rows[0];
  }

  async readByEmailWithPassword(email) {
    const [rows] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE email = ?`,
      [email]
    );
    return rows[0];
  }

  async readAll() {
    const [rows] = await this.database.query(`SELECT * FROM ${this.table}`);
    return rows;
  }

  async update(user) {
    // Récupérer les clés et les valeurs de l'objet user
    const keys = Object.keys(user);
    const values = Object.values(user);

    // Construire dynamiquement la requête SQL
    const setClause = keys.map((key) => `${key} = ?`).join(", ");

    // Ajouter la clé primaire (id) à la fin des valeurs
    values.push(user.id);

    // Exécuter la requête SQL
    const [edit] = await this.database.query(
      `UPDATE ${this.table} SET ${setClause} WHERE id = ?`,
      values
    );
    return edit;
  }

  async delete(id) {
    await this.database.query(`DELETE FROM ${this.table} WHERE id = ?`, [id]);
  }

  async updateAbonnement(userId, abonnementsId) {
    await this.database.query(
      `UPDATE ${this.table} SET abonnementsid = ? WHERE id = ?`,
      [abonnementsId, userId]
    );
  }
}

module.exports = UserRepository;
