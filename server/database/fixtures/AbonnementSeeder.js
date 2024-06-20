const AbstractSeeder = require("./AbstractSeeder");

// Import seeders that must be executed before this one
// Follow your foreign keys to find the right order ;)

class AbonnementSeeder extends AbstractSeeder {
  constructor() {
    // Call the constructor of the parent class (AbstractSeeder) with appropriate options
    super({ table: "abonnements", truncate: true });
  }

  // The run method - Populate the 'item' table with fake data

  run() {
    // Generate and insert fake data into the 'item' table
    for (let i = 0; i < 10; i += 1) {
      // Generate fake item data
      const fakeAbonnements = {
        name: this.faker.lorem.word(),
        montant: this.faker.number.int({ min: 0, max: 50 }),
        date_de_paiement: this.faker.date.anytime(), // Generate a fake title using faker library
        date_de_fin: this.faker.date.anytime(), // Generate a fake title using faker library
        // Get the insertId of the corresponding user from UserSeeder
        // Foreign Keys
        refName: `abonnements_${i}`, // Create a reference name for the model
      };

      // Insert the fakeItem data into the 'item' table
      this.insert(fakeAbonnements); // insert into item(title, user_id) values (?, ?)
    }
  }
}

// Export the ItemSeeder class
module.exports = AbonnementSeeder;
