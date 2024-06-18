import { 
    getCataloguesAsync as dbGetCataloguesAsync,
    getCatalogueByIdAsync as dbGetCatalogueByIdAsync,
 } from '../db/catalogues.db';
import { getRandomTheme } from '../openai/config/data';
import { generateQuestionsForQuizAsync, generateFillInTheBlankQuestionsAsync } from '../openai/quizzes.openai';
import { 
    CatalogueType, 
    QuestionType, 
    QuizType 
} from '../types/catalogues.types';

const getCataloguesAsync = async (): Promise<CatalogueType[]> => {
    const catalogues = await dbGetCataloguesAsync();
    return catalogues.map(u => u.toObject() as CatalogueType);
};

const getCatalogueByIdAsync = async (id: string): Promise<CatalogueType | null> => {
    try {
        const catalogue = await dbGetCatalogueByIdAsync(id);
        return catalogue?.toObject() as CatalogueType;
    }
    catch {
        // error when provided id does not conform to ObjectId format
        return null;
    }
};

const createQuizForCatalogueAsync = async (quizToCreate: QuizType): Promise<QuizType | null> => {
    // ask gpt to create questions
    const questions = await generateFillInTheBlankQuestionsAsync(quizToCreate.language, 3, quizToCreate.keywords);

    // save those questions to a quiz instance
    // persist to database
    return {
        ...quizToCreate,
        questions
    };
};

export {
    getCataloguesAsync,
    getCatalogueByIdAsync,
    createQuizForCatalogueAsync
}