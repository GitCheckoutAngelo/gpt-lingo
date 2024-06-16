import { Router, Request, Response } from 'express';
import { createUserController, getUserByIdController, getUsersController } from '../controllers/users.controllers';

// users router
const router = Router();

// routes
router.get('/', getUsersController);
router.get('/:id', getUserByIdController);
router.post('/', createUserController);

export default router;