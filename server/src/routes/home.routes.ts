import { Router, Request, Response } from 'express';

// home router
const router = Router();

// routes
router.get('/', (req: Request, res: Response) => res.send('Hello World!'));

export default router;