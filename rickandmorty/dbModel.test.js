const db = require("../data/dbConfig");
const dbModel = require("./dbModel");

beforeEach(async () => {
  await db("characters").truncate();
});

describe("Models", () => {
  describe("get()", () => {
    it("should fetch an array of characters", async () => {
      await db("characters").insert({ name: "Mr. Poopybutthole" });
      await db("characters").insert({ name: "Rick Sanchez" });

      const characters = await dbModel.get();

      return expect(characters).toHaveLength(2);
    });
  });

  describe("add()", () => {
    it("should insert a character", async () => {
      await dbModel.add({ name: "Mr. Poopybutthole" });

      const characters = await db("characters");
      return expect(characters).toHaveLength(1);
    });

    it("should return the inserted character with name and id", async () => {
      const character = await dbModel.add({ name: "Mr. Poopybutthole" });

      expect(character.name).toBe("Mr. Poopybutthole");
      expect(character.id).toBe(1);
    });
  });

  describe("delete()", () => {
    it("should remove character with the id", async () => {
      const character = await dbModel.add({ name: "Mr. Poopybutthole" });
      await dbModel.remove(character.id);

      const characters = await db("characters");

      return expect(characters).toHaveLength(0);
    });

    it("should return number of deleted records", async () => {
      const character = await dbModel.add({ name: "Mr. Poopybutthole" });
      const deleted = await dbModel.remove(character.id);

      return expect(deleted).toBe(1);
    });
  });
});
