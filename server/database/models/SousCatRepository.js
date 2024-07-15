const AbstractRepository = require("./AbstractRepository");

class SousCatRepository extends AbstractRepository {
  constructor() {
    // Call the constructor of the parent class (AbstractRepository)
    // and pass the table name "souscat" as configuration
    super({ table: "souscats" });
  }

  // The C of CRUD - Create operation
  async create(souscat) {
    // Execute the SQL INSERT query to add a new souscat to the "souscats" table
    const [result] = await this.database.query(
      `insert into ${this.table} (name, categories_id) values (?, ?)`,
      [souscat.name, souscat.categories_id]
    );

    // Return the ID of the newly inserted souscat
    return result.insertId;
  }

  // The R of CRUD - Read operations
  async read(id) {
    // Execute the SQL SELECT query to retrieve a specific souscat by its ID
    const [rows] = await this.database.query(
      `select * from ${this.table} where id = ?`,
      [id]
    );

    // Return the first row of the result, which represents the souscat
    return rows[0];
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all souscats from the "souscat" table
    const [rows] = await this.database.query(`select * from ${this.table}`);

    // Return the array of souscats
    return rows;
  }

  // The U of CRUD - Update operation
  // TODO: Implement the update operation to modify an existing souscat

  async update(souscat) {
    const [edit] = await this.database.query(
      `update ${this.table} set name =? where id =?`,
      [souscat.name, souscat.id]
    );
    return edit;
  }

  // The D of CRUD - Delete operation
  // TODO: Implement the delete operation to remove an souscat by its ID

  async delete(id) {
    // Execute the SQL DELETE query to remove an souscat from the "souscats" table
    const [destroy] = await this.database.query(
      `delete from ${this.table} where id = ?`,
      [id]
    );
    return destroy;
  }
}

module.exports = SousCatRepository;
