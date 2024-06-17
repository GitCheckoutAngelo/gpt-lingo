import UserType from "./users.types";

type OptionType = {
    text: string,
    isCorrect: boolean,
    wasChosen: boolean,
};

type QuestionType = {
    text: string, 
    category: 'multiple-choice' | 'true-false' | 'fill-in-the-blank' | 'text-answer',
    options?: OptionType[],
    responseText?: string,
    creditedMark: number,
    feedbackText: string,
};

type QuizType = {
    date: Date,
    language: 'english' | 'japanese' | 'tagalog',
    proficiencyLevel: 'beginner' | 'intermediate' | 'advanced',
    questions: QuestionType[],
};

type CatalogueType = {
    _id?: string,
    user?: UserType,
    quizzes: QuizType[]
};

export default CatalogueType