const AbstractRepository = require("./AbstractRepository");

class AbonnementRepository extends AbstractRepository {
  constructor() {
    super({ table: "abonnements" });
  }

  async create(abonnement) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (name, montant, durée, description, date_de_paiement, date_de_fin) VALUES (?, ?, ?, ?, ?, ?)`,
      [
        abonnement.name,
        abonnement.montant,
        abonnement.durée,
        abonnement.description,
        abonnement.date_de_paiement || new Date(),
      ]
    );

    return result.insertId;
  }

  async read(id) {
    const [rows] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE id = ?`,
      [id]
    );

    return rows[0];
  }

  async readAll() {
    const [rows] = await this.database.query(`SELECT * FROM ${this.table}`);
    return rows;
  }
}

module.exports = AbonnementRepository;
