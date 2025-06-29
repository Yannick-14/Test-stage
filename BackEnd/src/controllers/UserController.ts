import { Request, Response } from "express";
import { AppDataSource } from "../../config/db"
import { User } from "../entity/User"; // Assurez-vous que le chemin est correct
import { Repository } from "typeorm";

export class UserController {
  // Méthode pour récupérer la liste des utilisateurs
  static async findAllUser(req: Request, res: Response): Promise<void> {
    try {
      const userRepository = AppDataSource.getRepository(User);
      const users = await userRepository.find();
      res.status(200).json(users);
    } catch (error) {
      console.error("❌ Erreur lors de la récupération des utilisateurs :", error);
      res.status(500).json({ message: `Erreur serveur ${error}` });
    }
  }

  static async findByIdUser(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);
      console.log("Id: ", id);

      if (isNaN(id)) {
        res.status(400).json({ message: "ID invalide, doit être un nombre" });
        return;
      }

      const repositoryEntity = AppDataSource.getRepository(User);
      const user = await repositoryEntity.findOneBy({ id_User: id });

      res.status(200).json(user);
    } catch (error) {
      console.error("Erreur lors de la récupération de l'utilisateur :", error);
      res.status(500).json({ message: "Erreur serveur", error: (error as Error).message });
    }
  }

  static async createUser(req: Request, res: Response): Promise<void> {
    try {
      const bodyRequest = req.body;
      const userRepository: Repository<User> = AppDataSource.getRepository(User);
      const newUser = userRepository.create(bodyRequest);

      await userRepository.save(newUser);

      res.status(201).json({
        message: "Créér avec succès",
        user: newUser,
      });
    } catch (error) {
      console.error("❌ Erreur lors de l'insertion de l'utilisateur :", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  }

  static async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        res.status(400).json({ message: "ID invalide, doit être un nombre" });
        return;
      }

      const userRepository = AppDataSource.getRepository(User);
      const user = await userRepository.findOneBy({ id_User: id });

      if (!user) {
        res.status(404).json({ message: `Utilisateur non trouvé pour l'ID ${id}` });
        return;
      }

      const updatedData = req.body;
      userRepository.merge(user, updatedData);
      await userRepository.save(user);

      res.status(200).json({
        message: "Utilisateur mis à jour avec succès",
        user,
      });
    } catch (error) {
      console.error("❌ Erreur lors de la mise à jour de l'utilisateur :", error);
      res.status(500).json({ message: "Erreur serveur", error: (error as Error).message });
    }
  }

  static async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        res.status(400).json({ message: "ID invalide, doit être un nombre" });
        return;
      }

      const userRepository = AppDataSource.getRepository(User);
      const user = await userRepository.findOne({ 
         where:{id_User: id },
         relations:['userEntities']
      });

      if (!user) {
        res.status(404).json({ message: `Utilisateur non trouvé pour l'ID ${id}` });
        return;
      }

      await userRepository.remove(user);

      res.status(200).json({
        message: `Utilisateur avec l'ID ${id} supprimé avec succès`,
      });
    } catch (error) {
      console.error("❌ Erreur lors de la suppression de l'utilisateur :", error);
      res.status(500).json({ message: "Erreur serveur", error: (error as Error).message });
    }
  }
}
