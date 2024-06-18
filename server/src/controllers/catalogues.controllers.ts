import { Request, Response } from 'express';
import {
    getCataloguesAsync as serviceGetCataloguesAsync,
    getCatalogueByIdAsync as serviceGetCatalogueByIdAsync,
    createQuizForCatalogueAsync as serviceCreateQuizForCatalogueAsync,
} from '../services/catalogues.services';
import { CatalogueType } from '../types/catalogues.types';
import { CreateCatalogueQuizDto } from '../dtos/catalogues.dtos';

const getCataloguesController = async (req: Request, res: Response) => {
    const catalogues: CatalogueType[] = await serviceGetCataloguesAsync();
    return res.status(200).json(catalogues);
};

const getCatalogueByIdController = async (req: Request, res: Response) => {
    const { id } = req.params;
    const catalogue: CatalogueType | null = await serviceGetCatalogueByIdAsync(id);

    if (catalogue) {
        return res.status(200).json(catalogue);
    }
    else {
        return res.status(404).json({ message: 'Catalogue not found' });
    }
};

const createCatalogueQuizController = async (req: Request, res: Response) => {
    const quiz: CreateCatalogueQuizDto = req.body;
    const createdQuiz = await serviceCreateQuizForCatalogueAsync({
        date: new Date(),
        language: quiz.language,
        proficiencyLevel: quiz.proficiencyLevel,
        keywords: quiz.keywords,
        questions: [],
    });

    return res.status(200).json(createdQuiz);
};

export {
    getCataloguesController,
    getCatalogueByIdController,
    createCatalogueQuizController,
}