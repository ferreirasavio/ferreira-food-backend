import { Knex } from "knex";

export async function up(knex: Knex) {
  return knex.schema.createTable("menu_store", (table) => {
    table.increments("id_menu_store").primary();
    table.integer("id_rooms").notNullable().references('id_room').inTable('rooms');
    table.integer("id_events").notNullable().references('id_event').inTable('events');
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable("menu_store");
}
