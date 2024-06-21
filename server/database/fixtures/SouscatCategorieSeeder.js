const AbstractSeeder = require("./AbstractSeeder");
const SousCatSeeder = require("./SousCatSeeder");
const CategorieSeeder = require("./CategorieSeeder");

class SouscatCategorieSeeder extends AbstractSeeder {
  constructor() {
    // Call the constructor of the parent class (AbstractSeeder) with appropriate options
    super({
      table: "souscats_categories",
      truncate: true,
      dependencies: [SousCatSeeder, CategorieSeeder],
    });
  }

  // The run method - Populate the 'user' table with fake data

  run() {
    // Generate and insert fake data into the 'user' table
    for (let i = 0; i < 10; i += 1) {
      // Generate fake  data
      const fakeSouscatsCategories = {
        souscats_id: this.getRef(`souscats_${i}`).insertId, // Get the insertId of the corresponding brand from BrandeSeeder
        categories_id: this.getRef(`categories_${i}`).insertId, // Get the insertId of the corresponding brand from BrandeSeeder
      };

      // Insert the fakeUser data into the 'user' table
      this.insert(fakeSouscatsCategories); // insert into user(email, password) values (?, ?)
    }
  }
}

// Export the Souscat_CategorieSeeder class
module.exports = SouscatCategorieSeeder;
