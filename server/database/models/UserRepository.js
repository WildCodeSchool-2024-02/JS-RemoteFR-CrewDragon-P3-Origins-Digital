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
      `insert into ${this.table} (email, password, firstname, lastname, birthday, abonnements_id) values (?, ?, ?, ?, ?, ?)`,
      [
        user.email,
        user.password,
        user.firstname,
        user.lastname,
        user.birthday,
        user.abonnements_id,
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
}

module.exports = UserRepository;
