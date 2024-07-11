const AbstractRepository = require("./AbstractRepository");

class UserRepository extends AbstractRepository {
  constructor() {
    // Call the constructor of the parent class (AbstractRepository)
    // and pass the table name "user" as configuration
    super({ table: "users" });
  }

  // The C of CRUD - Create operation
  async create(user) {
    // Execute the SQL INSERT query to add a new user to the "users" table
    const [result] = await this.database.query(
      `insert into ${this.table} (firstname, lastname, birthday, email, hashed_password) values (?, ?, ?, ?, ? )`,
      [
        user.firstname,
        user.lastname,
        user.birthday,
        user.email,
        user.hashedPassword,
      ]
    );

    // Return the ID of the newly inserted user
    return result.insertId;
  }

  // The R of CRUD - Read operations
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
        ) AS abonnements
      FROM ${this.table} AS u
      JOIN abonnements AS a ON u.abonnements_id = a.id
      WHERE u.id = ?`,
      [id]
    );

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

  async update(user) {
    const [edit] = await this.database.query(
      `update ${this.table} set email =?, password =?, firstname =?, lastname =?, birthday =?, roles_id =?, abonnements_id =? where id =?`,
      [
        user.email,
        user.password,
        user.firstname,
        user.lastname,
        user.birthday,
        user.roles_id,
        user.abonnements_id,
        user.id,
      ]
    );
    return edit;
  }

  // The D of CRUD - Delete operation
  // TODO: Implement the delete operation to remove an user by its ID

  async delete(id) {
    // Execute the SQL DELETE query to remove an user from the "users" table
    const [destroy] = await this.database.query(
      `delete from ${this.table} where id = ?`,
      [id]
    );
    return destroy;
  }

  async readByEmailWithPassword(email) {
    // Execute the SQL SELECT query to retrieve a specific user by its email
    const [rows] = await this.database.query(
      `select * from ${this.table} where email = ?`,
      [email]
    );

    // Return the first row of the result, which represents the user
    return rows[0];
  }
}

module.exports = UserRepository;
