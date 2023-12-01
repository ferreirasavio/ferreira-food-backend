import { Request, Response } from "express";
import knex from "../database/connection";

class StoreController {
  async index(request: Request, response: Response) {
    const stores = await knex("store").select("store.*");
    return response.json(stores);
  }

  async create(request: Request, response: Response) {
    const { name, document, address } = request.body;

    try {
      const trx = await knex.transaction();

      const nameExists = await trx("store").where("name", name).first();
      const documentExists = await trx("store")
        .where("document", document)
        .first();

      if (nameExists) {
        await trx.rollback();
        return response.status(400).json({ error: "Store already exists!" });
      }

      if (documentExists) {
        await trx.rollback();
        return response.status(400).json({ error: "Document already exists!" });
      }

      await trx("store").insert({ name, document, address });
      await trx.commit();

      return response.json("Store created successfully!");
    } catch (error) {
      console.log(error);
      return response.status(500).json({ error: "Internal Server Error" });
    }
  }

  async remove(request: Request, response: Response) {
    const { id_store } = request.body;

    const deletedCount = await knex("store").where("id_store", id_store).del();

    if (deletedCount === 0) {
      return response.status(404).json({ error: "Store not found!" });
    }
    1;

    return response.json("Store deleted with success!");
  }
}

export default StoreController;
