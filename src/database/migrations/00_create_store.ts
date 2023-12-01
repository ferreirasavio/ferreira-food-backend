import { Knex } from "knex";

export async function up(knex: Knex) {
    return knex.schema.createTable('store', table => {
        table.increments('id_store').primary();
        table.string('name', 30).notNullable();
        table.string('document', 14).notNullable();
        table.timestamp('date_time', { useTz: true }).defaultTo(knex.fn.now());
        table.json('address').notNullable();
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable("store");
  }