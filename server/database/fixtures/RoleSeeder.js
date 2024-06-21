const AbstractSeeder = require("./AbstractSeeder");

// Import seeders that must be executed before this one
// Follow your foreign keys to find the right order ;)

class RoleSeeder extends AbstractSeeder {
  constructor() {
    // Call the constructor of the parent class (AbstractSeeder) with appropriate options
    super({ table: "roles", truncate: true });
  }

  // The run method - Populate the 'item' table with fake data

  run() {
    // Generate and insert fake data into the 'item' table
    for (let i = 0; i < 10; i += 1) {
      // Generate fake item data
      const fakeRoles = {
        name: this.faker.lorem.word(), // Generate a fake title using faker library
        // Get the insertId of the corresponding user from UserSeeder
        // Foreign Keys
        refName: `roles_${i}`, // Create a reference name for the model, // Get the insertId of the corresponding brand from BrandeSeeder
      };

      // Insert the fakeItem data into the 'item' table
      this.insert(fakeRoles); // insert into item(title, user_id) values (?, ?)
    }
  }
}

// Export the ItemSeeder class
module.exports = RoleSeeder;
