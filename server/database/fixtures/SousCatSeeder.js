const AbstractSeeder = require("./AbstractSeeder");

class SousCatSeeder extends AbstractSeeder {
  constructor() {
    // Call the constructor of the parent class (AbstractSeeder) with appropriate options
    super({
      table: "souscats",
      truncate: true,
    });
  }

  // The run method - Populate the 'souscats' table with fake data

  run() {
    // Generate and insert fake data into the 'souscats' table
    for (let i = 0; i < 10; i += 1) {
      // Generate fake souscats data
      const fakeSousCats = {
        name: this.faker.lorem.word(), // Generate a fake name using faker library
        refName: `souscats_${i}`, // Create a reference name for the model
      };

      // Insert the fakeSousCats data into the 'souscats' table
      this.insert(fakeSousCats); // insert into souscats(name) values (?)
    }
  }
}

// Export the SousCatSeeder class
module.exports = SousCatSeeder;
