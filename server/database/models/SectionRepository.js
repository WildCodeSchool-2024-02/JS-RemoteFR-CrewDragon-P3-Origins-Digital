const AbstractRepository = require("./AbstractRepository");

class sectionRepository extends AbstractRepository {
  constructor() {
    // Call the constructor of the parent class (AbstractRepository)
    // and pass the table name "section" as configuration
    super({ table: "sections" });
  }

  // The C of CRUD - Create operation

  async create(section) {
    // Execute the SQL INSERT query to add a new section to the "section" table
    const [result] = await this.database.query(
      `insert into ${this.table} (name, users_id) values (?, ?)`,
      [section.name, section.users_id]
    );

    // Return the ID of the newly inserted section
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id) {
    // Execute the SQL SELECT query to retrieve a specific section by its ID
    const [rows] = await this.database.query(
      `select * from ${this.table} where id = ?`,
      [id]
    );

    // Return the first row of the result, which represents the section
    return rows[0];
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all sections from the "section" table
    const [rows] = await this.database.query(`select * from ${this.table}`);

    // Return the array of sections
    return rows;
  }

  // The U of CRUD - Update operation
  // TODO: Implement the update operation to modify an existing section

  async update(section) {
    const [edit] = await this.database.query(
      `update ${this.table} set name =? where id =?`,
      [section.name, section.id]
    );
    return edit;
  }
  // async update(section) {
  //   ...
  // }

  // The D of CRUD - Delete operation
  // TODO: Implement the delete operation to remove an section by its ID
  async delete(id) {
    // Execute the SQL DELETE query to remove an section from the "sections" table
    const [destroy] = await this.database.query(
      `delete from ${this.table} where id = ?`,
      [id]
    );
    return destroy;
  }

  // async delete(id) {
  //   ...
  // }
}

module.exports = sectionRepository;
