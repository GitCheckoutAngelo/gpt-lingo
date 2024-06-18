import { Router } from 'express';
import { 
    getCataloguesController,
    getCatalogueByIdController,
    createCatalogueQuizController
} from '../controllers/catalogues.controllers';

// catalogues router
const router = Router();

// routes
router.get('/', getCataloguesController);
router.get('/:id', getCatalogueByIdController);
router.post('/:id/quizzes', createCatalogueQuizController);

export default router;