import { QuizLanguageType, QuizProficiencyLevelType } from "../types/helpers.types";

interface CreateCatalogueQuizDto {
    language: QuizLanguageType,
    proficiencyLevel: QuizProficiencyLevelType,
    keywords: string[],
}

export { CreateCatalogueQuizDto }