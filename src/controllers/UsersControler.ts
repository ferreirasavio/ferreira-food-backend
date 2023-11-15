// src/controllers/UsersController.js
import { Request, Response } from "express";
import knex from "../database/connection";

class UsersController {
  async create(request: Request, response: Response) {
    const { username, password } = request.body;

    const trx = await knex.transaction();
    const usernameExists = await trx("users")
      .where("username", username)
      .first();

    try {
      if (username) {
        if (usernameExists) {
          await trx.rollback();
          return response.status(400).json({ error: "User already exists!" });
        }
      }
      await knex("users").insert({ username, password });
      return response
        .status(201)
        .json({ message: "Usuário criado com sucesso." });
    } catch (error) {
      return response.status(500).json({ message: "Erro ao criar usuário." });
    }
  }

  async login(request: Request, response: Response) {
    const { username, password } = request.body;

    try {
      const user = await knex("users").where({ username, password }).first();

      if (!user) {
        return response
          .status(404)
          .json({ message: "Usuário não encontrado." });
      }

      return response.json(user);
    } catch (error) {
      return response.status(500).json({ message: "Erro ao fazer login." });
    }
  }
}

export default UsersController;
