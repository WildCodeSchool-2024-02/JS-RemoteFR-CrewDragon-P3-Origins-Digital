const AbstractSeeder = require("./AbstractSeeder");

class CategorieSeeder extends AbstractSeeder {
  constructor() {
    // Call the constructor of the parent class (AbstractSeeder) with appropriate options
    super({
      table: "categories",
      truncate: true,
    });
  }

  // The run method - Populate the 'categorie' table with fake data

  run() {
    // Generate and insert fake data into the 'categories' table
    for (let i = 0; i < 10; i += 1) {
      // Generate fake categories data
      const fakeCategories = {
        name: this.faker.lorem.word(), // Generate a fake email using faker library
        refName: `categories_${i}`, // Create a reference name for the model
      };

      // Insert the fakecategorie data into the 'categories' table
      this.insert(fakeCategories); // insert into categories(name) values (?)
    }
  }
}

// Export the CategorieSeeder class
module.exports = CategorieSeeder;
