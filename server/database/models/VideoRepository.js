const AbstractRepository = require("./AbstractRepository");

class VideoRepository extends AbstractRepository {
  constructor() {
    // Call the constructor of the parent class (AbstractRepository)
    // and pass the table name "video" as configuration
    super({ table: "videos" });
  }

  // The C of CRUD - Create operation
  async create(video) {
    // Execute the SQL INSERT query to add a new video to the "videos" table
    const [result] = await this.database.query(
      `insert into ${this.table} (title, description, url, date, grille, hero, carouStatique, carouDynamique, freemium, miniature, categories_id, souscats_id) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        video.title,
        video.description,
        video.url,
        video.date,
        video.grille,
        video.hero,
        video.carouStatique,
        video.carouDynamique,
        video.abonnementsid,
        video.miniature,
        video.categories_id,
        video.souscats_id,
      ]
    );

    // Return the ID of the newly inserted video
    return result.insertId;
  }

  // The R of CRUD - Read operations
  async read(id) {
    // Execute the SQL SELECT query to retrieve a specific video by its ID
    const [rows] = await this.database.query(
      `select * from ${this.table} where id = ?`,
      [id]
    );

    // Return the first row of the result, which represents the video
    return rows[0];
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all videos from the "video" table

    const [rows] = await this.database.query(`
      SELECT
        v.*,
        JSON_OBJECT(
          'id', sc.id,
          'name', sc.name
        ) AS categories,
        JSON_OBJECT(
          'id', c.id,
          'name', c.name
        ) AS souscats
      FROM ${this.table} AS v
      JOIN souscats AS sc ON v.souscats_id = sc.id
      LEFT JOIN categories AS c ON v.categories_id = c.id
    `);

    // const [rows] = await this.database.query(`select * from videos`);

    // Return the array of videos
    return rows;
  }

  // The U of CRUD - Update operation
  // TODO: Implement the update operation to modify an existing video

  async update(video) {
    const [edit] = await this.database.query(
      `update ${this.table} set title =?, description =?, url =?, date =?, grille =?, hero =?, carouStatique =?, carouDynamique =?, freemium =?, miniature =? where id =? `,
      [
        video.title,
        video.description,
        video.url,
        video.date,
        video.grille,
        video.hero,
        video.carouStatique,
        video.carouDynamique,
        video.freemium,
        video.miniature,
        video.id,
      ]
    );
    return edit;
  }

  // The D of CRUD - Delete operation
  // TODO: Implement the delete operation to remove an video by its ID

  async delete(id) {
    // Execute the SQL DELETE query to remove an video from the "videos" table
    const [destroy] = await this.database.query(
      `delete from ${this.table} where id = ?`,
      [id]
    );
    return destroy;
  }
}

module.exports = VideoRepository;
