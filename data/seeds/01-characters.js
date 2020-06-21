exports.seed = function(knex) {
  return knex("characters").insert([
    { id: 1, name: "Rick Sanchez" },
    { id: 2, name: "Morty Smith" },
    { id: 3, name: "Summer Smith" },
    { id: 4, name: "Jerry Smith" },
    { id: 5, name: "Beth Smith" }
  ]);
};
