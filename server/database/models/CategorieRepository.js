const AbstractRepository = require("./AbstractRepository");

class CategorieRepository extends AbstractRepository {
  constructor() {
    // Call the constructor of the parent class (AbstractRepository)
    // and pass the table name "categorie" as configuration
    super({ table: "categories" });
  }

  // The C of CRUD - Create operation
  async create(categorie) {
    // Execute the SQL INSERT query to add a new categorie to the "categories" table
    const [result] = await this.database.query(
      `insert into ${this.table} (name, image) values (?, ?)`,
      [categorie.name, categorie.image]
    );

    // Return the ID of the newly inserted categorie
    return result.insertId;
  }

  // The R of CRUD - Read operations
  async read(id) {
    // Execute the SQL SELECT query to retrieve a specific categorie by its ID
    const [rows] = await this.database.query(
      `select * from ${this.table} where id = ?`,
      [id]
    );

    // Return the first row of the result, which represents the categorie
    return rows[0];
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all categories from the "categorie" table
    const [rows] = await this.database.query(`select * from ${this.table}`);

    // Return the array of categories
    return rows;
  }

  // The U of CRUD - Update operation
  // TODO: Implement the update operation to modify an existing categorie

  async update(categorie) {
    // Récupérer les clés et les valeurs de l'objet categorie
    const keys = Object.keys(categorie);
    const values = Object.values(categorie);

    // Construire dynamiquement la requête SQL
    const setClause = keys.map((key) => `${key} = ?`).join(", ");

    // Ajouter la clé primaire (id) à la fin des valeurs
    values.push(categorie.id);

    // Exécuter la requête SQL
    const [edit] = await this.database.query(
      `UPDATE ${this.table} SET ${setClause} WHERE id = ?`,
      values
    );
    return edit;
  }

  // The D of CRUD - Delete operation
  // TODO: Implement the delete operation to remove an categorie by its ID

  async delete(id) {
    // Execute the SQL DELETE query to remove an categorie from the "categories" table
    const [destroy] = await this.database.query(
      `delete from ${this.table} where id = ?`,
      [id]
    );
    return destroy;
  }
}

module.exports = CategorieRepository;
