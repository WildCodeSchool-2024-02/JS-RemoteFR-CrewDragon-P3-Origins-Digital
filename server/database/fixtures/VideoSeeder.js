const AbstractSeeder = require("./AbstractSeeder");

class VideoSeeder extends AbstractSeeder {
  constructor() {
    // Call the constructor of the parent class (AbstractSeeder) with appropriate options
    super({
      table: "videos",
      truncate: true,
    });
  }

  // The run method - Populate the 'user' table with fake data

  run() {
    // Generate and insert fake data into the 'user' table
    for (let i = 0; i < 10; i += 1) {
      // Generate fake user data
      const fakeVideos = {
        title: this.faker.lorem.word(), // Generate a fake title using faker library
        description: this.faker.lorem.lines({ min: 1, max: 3 }), // Generate a fake password using faker library
        url: this.faker.internet.url(),
        date: this.faker.lorem.word({ min: 1, max: 9 }),
        grille: this.faker.datatype.boolean(),
        hero: this.faker.datatype.boolean(), // Get the insertId of the corresponding brand from BrandeSeeder
        carouStatique: this.faker.datatype.boolean(), // Get the insertId of the corresponding brand from BrandeSeeder
        carouDynamique: this.faker.datatype.boolean(), //  Create a reference name for the model
        freemium: this.faker.datatype.boolean(),
        miniature: this.faker.internet.url(),
      };

      // Insert the fakeUser data into the 'user' table
      this.insert(fakeVideos); // insert into user(email, password) values (?, ?)
    }
  }
}

// Export the UserSeeder class
module.exports = VideoSeeder;
