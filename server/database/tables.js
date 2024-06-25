// Import the repository modules responsible for handling data operations on the tables
const RoleRepository = require("./models/RoleRepository");
const AbonnementRepository = require("./models/AbonnementRepository");
const UserRepository = require("./models/UserRepository");
const CategorieRepository = require("./models/CategorieRepository");
const SousCatRepository = require("./models/SousCatRepository");
const SectionRepository = require("./models/SectionRepository");
const VideoRepository = require("./models/VideoRepository");

// Create an empty object to hold data repositories for different tables
const tables = {};

/* ************************************************************************* */
// Register data repositories for tables
/* ************************************************************************* */

// Register each repository as data access point for its table
tables.role = new RoleRepository();
tables.abonnement = new AbonnementRepository();
tables.user = new UserRepository();
tables.categorie = new CategorieRepository();
tables.souscat = new SousCatRepository();
tables.section = new SectionRepository();
tables.video = new VideoRepository();

/* ************************************************************************* */

// Use a Proxy to customize error messages when trying to access a non-existing table

// Export the Proxy instance with custom error handling
module.exports = new Proxy(tables, {
  get(obj, prop) {
    // Check if the property (table) exists in the tables object
    if (prop in obj) return obj[prop];

    // If the property (table) does not exist, throw a ReferenceError with a custom error message
    throw new ReferenceError(
      `tables.${prop} is not defined. Did you register it in ${__filename}?`
    );
  },
});
