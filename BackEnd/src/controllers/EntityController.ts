import { Request, Response } from "express";
import { AppDataSource } from "../../config/db"
import { Entite } from "../entity/Entite";
import { Repository } from "typeorm";

export class EntityController {

  static async createEntity(req: Request, res: Response): Promise<void> {
    try {
      const bodyRequest = req.body;
      const repositoryEntity = AppDataSource.getRepository(Entite);

      const createEntity = repositoryEntity.create(bodyRequest);
      await repositoryEntity.save(createEntity);
      res.status(201).json({ message: "Créér avec succès" });
    } catch (error) {
      console.error("Erreur lors de la création de l'entité :", error);
      res.status(500).json({ message: "Erreur serveur", error: (error as Error).message });
    }
  }

  static async findAllEntity(req: Request, res: Response): Promise<void> {
    try {
      const repositoryEntity = AppDataSource.getRepository(Entite);
      const entities = await repositoryEntity.find();
      res.status(200).json(entities);
    } catch (error) {
      console.error("Erreur lors de la récupération des entités :", error);
      res.status(500).json({ message: "Erreur serveur", error: (error as Error).message });
    }
  }

  static async findById(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        res.status(400).json({ message: "ID invalide, doit être un nombre" });
        return;
      }

      const repositoryEntity = AppDataSource.getRepository(Entite);
      const entity = await repositoryEntity.findOneBy({ id_Entity: id });

      if (!entity) {
        res.status(404).json({ message: `Entité non trouvée pour ${id}` });
        return;
      }

      res.status(200).json(entity);
    } catch (error) {
      console.error("Erreur lors de la récupération de l'entité :", error);
      res.status(500).json({ message: "Erreur serveur", error: (error as Error).message });
    }
  }

  static async updateEntity(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        res.status(400).json({ message: "ID invalide, doit être un nombre" });
        return;
      }

      const repositoryEntity = AppDataSource.getRepository(Entite);
      const entity = await repositoryEntity.findOneBy({ id_Entity: id });

      if (!entity) {
        res.status(404).json({ message: `Entité non trouvée pour l'ID ${id}` });
        return;
      }

      const updatedData = req.body;
      repositoryEntity.merge(entity, updatedData);
      await repositoryEntity.save(entity);

      res.status(200).json({
        message: "Mise à jour avec succès",
        entity,
      });
    } catch (error) {
      console.error("❌ Erreur lors de la mise à jour de l'entité :", error);
      res.status(500).json({ message: "Erreur serveur", error: (error as Error).message });
    }
  }

  static async deleteEntity(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        res.status(400).json({ message: "ID invalide, doit être un nombre" });
        return;
      }

      const repositoryEntity = AppDataSource.getRepository(Entite);
      const entity = await repositoryEntity.findOne({ 
        where:{id_Entity: id },
        relations:['userEntities']
      });

      if (!entity) {
        res.status(404).json({ message: `Entité non trouvée pour l'ID ${id}` });
        return;
      }

      await repositoryEntity.remove(entity);

      res.status(200).json({
        message: `Entité avec l'ID ${id} supprimée avec succès`,
      });
    } catch (error) {
      console.error("❌ Erreur lors de la suppression de l'entité :", error);
      res.status(500).json({ message: "Erreur serveur", error: (error as Error).message });
    }
  }
}