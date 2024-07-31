// Import required dependencies
const { app, request, database } = require("../config");

// Test suite for the POST /api/users route
// Doesn't pass: maybe something to change in app config :/
// Hint: enabling error log could help ;)
describe("POST /api/users", () => {
  it("should add a new user successfully", async () => {
    // Mock result of the database query
    const result = [{ insertId: 1 }];

    // Mock the implementation of the database query method
    jest.spyOn(database, "query").mockImplementation(() => [result]);

    // Fake user data
    const fakeUser = {
        email: "foobar@gmail.com",
        password: "foobar",
        firstname: "foo",
        lastname: "bar",
        birthday: "2024-07-09",
    };

    // Send a POST request to the /api/users endpoint with a test user
    const response = await request(app)
      .post("/api/users")
      .send(fakeUser);

    // Assertions
    expect(response.status).toBe(201);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body.insertId).toBe(result.insertId);
  });
});