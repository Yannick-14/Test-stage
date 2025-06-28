import { Router } from "express";
import { EntityController } from "../controllers/EntityController";
import { UserController } from "../controllers/UserController";
import { UserEntityController } from "../controllers/UserEntityController";
const router = Router();

router.get('/entities', EntityController.findAllEntity);
router.get('/entities/:id', EntityController.findById);
router.post('/entities', EntityController.createEntity);
router.put('/entities/:id', EntityController.updateEntity);
router.delete('/entities/:id', EntityController.deleteEntity);


router.get('/users', UserController.findAllUser);
router.get('/users/:id', UserController.findByIdUser);
router.post('/users', UserController.createUser);
router.put('/users/:id', UserController.updateUser);
router.delete('/users/:id', UserController.deleteUser);

router.post('/user-entities', UserEntityController.createUserEntity);
router.get('/user-entities', UserEntityController.findAllUserEntity);
router.get('/user-entities/:id', UserEntityController.findByIdUserEntity);
router.put('/user-entities/:id', UserEntityController.updateUserEntity);
router.delete('/user-entities/:id', UserEntityController.deleteUserEntity);

export default router;
