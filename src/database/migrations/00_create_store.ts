import { Knex } from "knex";

export async function up(knex: Knex) {
    return knex.schema.createTable('store', table => {
        table.increments('id_store').primary();
        table.string('name', 30).notNullable();
        table.string('document', 14).notNullable();
        table.dateTime('date_time').notNullable();
        table.json('address').notNullable();
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable("store");
  }