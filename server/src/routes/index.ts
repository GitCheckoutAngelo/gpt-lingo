import { Router } from 'express';
import homeRouter from './home.routes';
import usersRouter from './users.routes';

// index router
const router = Router();

// API routers
router.use('/', homeRouter);
router.use('/users', usersRouter);

export default router;