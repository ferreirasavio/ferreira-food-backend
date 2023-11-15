import { Knex } from "knex";

export async function seed(knex: Knex) {
  await knex("store").insert([
    {
      name: "Paladar",
      document: "63004943000102",
      address: JSON.stringify({
        street: "Avenida Tenente Armindo Leal Gonçalves",
        neighborhood: "Sargento Roncalli",
        number: "50",
      }),
    },
  ]);
}
