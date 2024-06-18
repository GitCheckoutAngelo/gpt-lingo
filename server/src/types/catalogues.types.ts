import { QuizLanguageType, QuizProficiencyLevelType, QuizQuestionCategoryType } from "./helpers.types";
import { UserType } from "./users.types";

type OptionType = {
    text: string,
    isCorrect: boolean,
    wasChosen: boolean,
};

type QuestionType = {
    text: string, 
    category: QuizQuestionCategoryType,
    options?: OptionType[],
    responseText?: string,
    creditedMark: number,
    feedbackText: string,
};

type QuizType = {
    date: Date,
    language: QuizLanguageType,
    proficiencyLevel: QuizProficiencyLevelType,
    keywords: string[],
    questions: QuestionType[],
};

type CatalogueType = {
    _id?: string,
    user?: UserType,
    quizzes: QuizType[]
};

export { 
    CatalogueType, 
    QuizType, 
    QuestionType,
    OptionType
}