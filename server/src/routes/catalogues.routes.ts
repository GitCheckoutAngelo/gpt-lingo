import { Router } from 'express';
import { 
    getCataloguesController,
    getCatalogueByIdController
} from '../controllers/catalogues.controllers';

// users router
const router = Router();

// routes
router.get('/', getCataloguesController);
router.get('/:id', getCatalogueByIdController);

export default router;