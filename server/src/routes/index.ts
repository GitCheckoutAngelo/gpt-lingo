import { Router } from 'express';
import homeRouter from './home.routes';
import usersRouter from './users.routes';
import cataloguesRouter from './catalogues.routes';

// index router
const router = Router();

// API routers
router.use('/', homeRouter);
router.use('/users', usersRouter);
router.use('/catalogues', cataloguesRouter);

export default router;