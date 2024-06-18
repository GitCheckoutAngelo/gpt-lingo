const QuizQuestionCategoryTypes = ['multiple-choice', 'true-false', 'fill-in-the-blank', 'text-answer'] as const; // ref: https://danielbarta.com/literal-iteration-typescript/
type QuizQuestionCategoryType = typeof QuizQuestionCategoryTypes[number];

type QuizLanguageType = 'english' | 'japanese' | 'tagalog';

type QuizProficiencyLevelType = 'beginner' | 'intermediate' | 'advanced';

export {
    QuizQuestionCategoryType,
    QuizLanguageType,
    QuizProficiencyLevelType,
}