const AbstractRepository = require("./AbstractRepository");

class AbonnementRepository extends AbstractRepository {
  constructor() {
    // Call the constructor of the parent class (AbstractRepository)
    // and pass the table name "user" as configuration
    super({ table: "abonnements" });
  }

  // The C of CRUD - Create operation
  async create(abonnement) {
    // Execute the SQL INSERT query to add a new user to the "users" table
    const [result] = await this.database.query(
      `insert into ${this.table} (name, montant, date_de_paiement, date_de_fin ) values (?, ?, ?, ?)`,
      [
        abonnement.name,
        abonnement.montant,
        abonnement.date_de_paiement,
        abonnement.date_de_fin,
      ]
    );

    // Return the ID of the newly inserted user
    return result.insertId;
  }

  // The R of CRUD - Read operations
  async read(id) {
    // Execute the SQL SELECT query to retrieve a specific user by its ID
    const [rows] = await this.database.query(
      `select * from ${this.table} where id = ?`,
      [id]
    );

    // Return the first row of the result, which represents the user
    return rows[0];
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all users from the "user" table
    const [rows] = await this.database.query(`select * from ${this.table}`);

    // Return the array of users
    return rows;
  }

  // The U of CRUD - Update operation
  // TODO: Implement the update operation to modify an existing user

  // async update(user) {
  //   ...
  // }

  // The D of CRUD - Delete operation
  // TODO: Implement the delete operation to remove an user by its ID

  // async delete(id) {
  //   ...
  // }
}

module.exports = AbonnementRepository;
