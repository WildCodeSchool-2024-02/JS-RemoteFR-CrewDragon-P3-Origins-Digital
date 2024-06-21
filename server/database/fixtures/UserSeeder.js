const AbstractSeeder = require("./AbstractSeeder");
const RoleSeeder = require("./RoleSeeder");
const AbonnementSeeder = require("./AbonnementSeeder");

class UserSeeder extends AbstractSeeder {
  constructor() {
    // Call the constructor of the parent class (AbstractSeeder) with appropriate options
    super({
      table: "users",
      truncate: true,
      dependencies: [RoleSeeder, AbonnementSeeder],
    });
  }

  // The run method - Populate the 'user' table with fake data

  run() {
    // Generate and insert fake data into the 'user' table
    for (let i = 0; i < 10; i += 1) {
      // Generate fake user data
      const fakeUsers = {
        email: this.faker.internet.email(), // Generate a fake email using faker library
        password: this.faker.internet.password(), // Generate a fake password using faker library
        firstname: this.faker.lorem.word(),
        lastname: this.faker.lorem.word(),
        birthday: this.faker.date.anytime(),
        roles_id: this.getRef(`roles_${i}`).insertId, // Get the insertId of the corresponding brand from BrandeSeeder
        abonnements_id: this.getRef(`abonnements_${i}`).insertId, // Get the insertId of the corresponding brand from BrandeSeeder
        refName: `users_${i}`, //  Create a reference name for the model
      };

      // Insert the fakeUser data into the 'user' table
      this.insert(fakeUsers); // insert into user(email, password) values (?, ?)
    }
  }
}

// Export the UserSeeder class
module.exports = UserSeeder;
