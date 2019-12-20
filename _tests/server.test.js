const app = require("./../server/testingServer.js");
const request = require("supertest");
app.listen(4000);

describe("testing server functions with database", () => {
  test("It should return an object", async done => {
    const response = await request(app).get("/users");
    expect(response.body.users).toBeDefined();
    // expect(response.body.articleAuthor).toBeDefined();
    expect(response.statusCode).toBe(200);
    done();
  });
  test("It should 404 for wrong requests", async done => {
    const response = await request(app).get("/users/nothing");
    expect(response.statusCode).toBe(500);
    done();
  });
});


