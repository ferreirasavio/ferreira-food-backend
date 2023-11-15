import { Knex } from "knex";

exports.up = function (knex: Knex) {
  return knex.schema.createTable("users", function (table) {
    table.increments("id").primary();
    table.string("username").notNullable();
    table.string("password").notNullable();
  });
};

exports.down = function (knex: Knex) {
  return knex.schema.dropTable("users");
};
