const request = require("supertest");
const db = require("../data/dbConfig");

const server = require("./server");

beforeEach(async () => {
  await db("characters").truncate();
});

describe("Server", () => {
  describe("GET / ", () => {
    it("should return 200 OK", async () => {
      const res = await request(server).get("/");

      return expect(res.status).toBe(200);
    });

    it("should return JSON formatted response", async () => {
      const res = await request(server).get("/");

      return expect(res.type).toMatch(/json/i);
    });

    it("should return characters with an array length of 0", async () => {
      const res = await request(server).get("/");

      return expect(res.body).toHaveLength(0);
    });
  });

  describe("POST /", () => {
    it("should return a 201 Created", async () => {
      const newCharacter = { name: "Mr. Poopybutthole" };
      const res = await request(server)
        .post("/")
        .send(newCharacter)
        .set("Accept", "application/json");

      return expect(res.status).toBe(201);
    });

    it("should return character object with name property", async () => {
      const newCharacter = { name: "Mr. Poopybutthole" };
      const res = await request(server)
        .post("/")
        .send(newCharacter)
        .set("Accept", "application/json");

      return expect(res.body.name).toBe("Mr. Poopybutthole");
    });

    it("should return character object with id property", async () => {
      const newCharacter = { name: "Mr. Poopybutthole" };
      const res = await request(server)
        .post("/")
        .send(newCharacter)
        .set("Accept", "application/json");

      return expect(res.body.id).toBe(1);
    });
  });

  describe("DELETE /:id", () => {
    it("should return 202 status code", async () => {
      const newCharacter = { name: "Mr. Poopybutthole" };
      const res = await request(server)
        .post("/")
        .send(newCharacter)
        .set("Accept", "application/json");

      const deleted = await request(server).delete(`/${res.body.id}`);

      return expect(deleted.status).toBe(202);
    });

    it("should return number of deleted records", async () => {
      const newCharacter = { name: "Mr. Poopybutthole" };
      const res = await request(server)
        .post("/")
        .send(newCharacter)
        .set("Accept", "application/json");

      const deleted = await request(server).delete(`/${res.body.id}`);

      return expect(deleted.body).toBe(1);
    });
  });
});
