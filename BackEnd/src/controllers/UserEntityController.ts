import { Request, Response } from "express";
import { AppDataSource } from "../../config/db"
import { UserEntity } from "../entity/UserEntity"; // Assurez-vous que le chemin est correct
import { Repository } from "typeorm";

export class UserEntityController {
  static async findAllUserEntity(req: Request, res: Response): Promise<void> {
    try {
      const userRepository = AppDataSource.getRepository(UserEntity);
      const users = await userRepository.find({
        relations: ["user_ID", "entity_ID"]
      });
      res.status(200).json(users);
    } catch (error) {
      console.error(`❌ Erreur lors de la récupération pour userRepository :`, error);
      res.status(500).json({ message: `Erreur serveur ${error}` });
    }
  }

  static async findByIdUserEntity(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        res.status(400).json({ message: "ID invalide, doit être un nombre" });
        return;
      }
      const userRepository = AppDataSource.getRepository(UserEntity);
      const users = await userRepository.findOne({
        where: {id_UserEntity:id},
        relations: ["user_ID", "entity_ID"]
      });
      res.status(200).json(users);
    } catch (error) {
      console.error(`❌ Erreur lors de la récupération pour userRepository :`, error);
      res.status(500).json({ message: `Erreur serveur ${error}` });
    }
  }

  static async createUserEntity(req: Request, res: Response): Promise<void> {
    try {
      const bodyRequest = req.body;
      const userRepository: Repository<UserEntity> = AppDataSource.getRepository(UserEntity);
      const newUserEntity = userRepository.create(bodyRequest);

      await userRepository.save(newUserEntity);

      res.status(201).json({
        message: "Créér avec succès",
        userEntity: newUserEntity,
      });
    } catch (error) {
      console.error("❌ Erreur lors de l'insertion de l'utilisateur :", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  }

  static async updateUserEntity(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        res.status(400).json({ message: "ID invalide, doit être un nombre" });
        return;
      }

      const userEntityRepository = AppDataSource.getRepository(UserEntity);
      const userEntity = await userEntityRepository.findOne({
        where: { id_UserEntity: id },
        relations: ["user_ID", "entity_ID"],
      });

      if (!userEntity) {
        res.status(404).json({ message: `UserEntity non trouvé pour l'ID ${id}` });
        return;
      }

      const updatedData = req.body;
      userEntityRepository.merge(userEntity, updatedData);
      await userEntityRepository.save(userEntity);

      res.status(200).json({
        message: "UserEntity mis à jour avec succès",
        userEntity,
      });
    } catch (error) {
      console.error("❌ Erreur lors de la mise à jour de l'UserEntity :", error);
      res.status(500).json({ message: "Erreur serveur", error: (error as Error).message });
    }
  }

  static async deleteUserEntity(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        res.status(400).json({ message: "ID invalide, doit être un nombre" });
        return;
      }

      const userEntityRepository = AppDataSource.getRepository(UserEntity);
      const userEntity = await userEntityRepository.findOneBy({ id_UserEntity: id });

      if (!userEntity) {
        res.status(404).json({ message: `UserEntity non trouvé pour l'ID ${id}` });
        return;
      }

      await userEntityRepository.remove(userEntity);

      res.status(200).json({
        message: `UserEntity avec l'ID ${id} supprimé avec succès`,
      });
    } catch (error) {
      console.error("❌ Erreur lors de la suppression de l'UserEntity :", error);
      res.status(500).json({ message: "Erreur serveur", error: (error as Error).message });
    }
  }
}
