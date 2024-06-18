import { OptionType, QuestionType } from "../types/catalogues.types";
import { QuizLanguageType, QuizProficiencyLevelType, QuizQuestionCategoryType } from "../types/helpers.types";
import { openaiClient } from "./config/config";
import { PROFICIENCY_LEVEL, QUESTION_CATEGORY_FORMAT, getRandomTheme } from "./config/data";
import dotenv from 'dotenv'
import { removeJsonFormattingFromGptResponse } from "./helpers/responseParser.helpers";

// enable dotenv
dotenv.config();

type GptResponseQuestionType = { text: string, options?: { text: string, isCorrect: Boolean }[] };

// TODO: Perhaps, come up with a more reliable method for generating wider variety questions
const generateKeywordsForQuizThemeAsync = async (quizTheme: string) => {
    const response = await openaiClient.chat.completions.create({
        model: process.env.OPENAI_API_MODEL!,
        messages: [
            {
                "role": "system",
                "content": `I will provide you with a quiz theme. Your task is to give me a comma-separated list of specific keywords related to that theme.`
            },
            {
                "role": "user",
                "content": quizTheme
            }
        ],
        temperature: Math.random(),
    });
    return response.choices[0].message.content;
};

// TODO: Only really usable for multiple-choice questions
const generateQuestionsForQuizAsync = async (
    numQuestions: number, 
    theme: string, 
    questionCategory: QuizQuestionCategoryType, 
    language: QuizLanguageType, 
    proficiencyLevel: QuizProficiencyLevelType
): Promise<QuestionType[]> => {
    const questionCategoryFormat = QUESTION_CATEGORY_FORMAT[questionCategory];
    const outputFormat = `${questionCategoryFormat.outputFormat.join(", ")} - ${questionCategoryFormat.outputFormatNotes}`;
    const questionTemplates = questionCategoryFormat.questionTemplates.join(", ");

    const keywords = await generateKeywordsForQuizThemeAsync(theme);

    try {
        const response = await openaiClient.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    "role": "system",
                    "content": "You will be provided with a target language and a proficiency level for that target language as a comma-separated list."
                },
                {
                    "role": "system",
                    "content": `Your task is to generate ${numQuestions} ${questionCategoryFormat.title} questions for helping learn the target language, appropriate to the specified level of proficiency.`
                },
                {
                    "role": "system",
                    "content": `
                        Your output should be an array of JSON objects, each of type Question such that: ${outputFormat}.
                        The output should be a stringified JSON array, such that it can be easily parsed using Javascript's JSON.parse method.`
                },
                {
                    "role": "system",
                    "content": `
                        The types of questions you generate should abide by the theme of ${theme}.
                        Consider using these keywords to inspire your question generation: ${keywords}
                        A few question templates to consider, but not limit yourself to include: ${questionTemplates}.
                        Make sure that the questions you ask are written primarily in English, and include only the relevant phrases and words in the provided target language.
                        `
                },
                {
                    "role": "user",
                    "content": `Language:${language}, Proficiency: ${proficiencyLevel}`
                }
            ],
            temperature: Math.random(),
        });
    
        const rawData = response.choices[0].message.content ?? "";
        // console.log(rawData);
        const gptQuestionArr = JSON.parse(rawData) as { text: string, options?: { text: string, isCorrect: Boolean }[] }[];

        return gptQuestionArr.map(q => {
            return {
                text: q.text,
                category: questionCategory,
                options: q.options?.map(o => {
                    return {
                        text: o.text,
                        isCorrect: o.isCorrect,
                        wasChosen: false,
                    } as OptionType;
                }),
                responseText: undefined,
                creditedMark: 0,
                feedbackText: "",
            } as QuestionType;
        });
    }
    catch {
        return [];
    }
};

export const testOpenAiAsync = async () => {
    const numQuestions = 5;
    const theme = getRandomTheme();
    console.log(`THEME: ${theme}`);

    const response = await openaiClient.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            {
                "role": "system",
                "content": "You will be provided with a language and a proficiency level."
            },
            {
                "role": "system",
                "content": `Your task is to generate ${numQuestions} multiple-choice (each with 4 options) questions for helping learn that language, appropriate to the specified level of proficiency.`
            },
            {
                "role": "system",
                "content": `
                    The types of questions you generate should abide by the theme of ${theme}.
                    A few question templates to consider, but not limit yourself to include:
                        Vocabulary Questions: What does [word] mean in [target language]?, 
                        Synonym/Antonym: What is a synonym for [word]?, 
                        Grammar Knowledge: How do you conjugate [verb] in present tense, past tense, or -future tense?, 
                        Practical Situations: What would you say in [situation] in [target language]?
                    .`
            },
            {
                "role": "system",
                "content": `
                    Your output should be an array of JSON objects, each of type Question such that: type Option = { text: string, isCorrect: boolean }, type Question = { text: string, options: Option[] }.
                    The question text itself should be in English and the correct option should have its isCorrect value set to true.
                    The output should be a stringified JSON array, such that it can be easily parsed using Javascript's JSON.parse method.`
            },
            {
                "role": "user",
                "content": `tagalog, ${PROFICIENCY_LEVEL["intermediate"]}`
            }
        ],
        temperature: Math.random(),
    });
    console.log(response.choices[0].message.content);

    return response.choices[0].message.content;
};

const generateExpandedKeywordListAsync = async (language: QuizLanguageType, keywords: string[]) => {
    const response = await openaiClient.chat.completions.create({
        model: process.env.OPENAI_API_MODEL!,
        messages: [
            {
                "role": "system",
                "content": `
                    I will provide you with an array of strings containing keywords. 
                    Your task is to generate words that are related to the provided keywords.
                    Make sure that the words are in the language of ${language}.
                    Ensure that your output is a single JSON array of strings.
                    `
            },
            {
                "role": "user",
                "content": `${keywords}`
            }
        ],
        temperature: Math.random(),
    });

    const rawGptResponse = response.choices[0].message.content ?? "";
    const gptResponse = removeJsonFormattingFromGptResponse(rawGptResponse);
    return JSON.parse(gptResponse) as string[] ??  [];
};

// TODO: Perhaps, come up with a more reliable method for generating wider variety questions
const generateFillInTheBlankQuestionsAsync = async (
    language: QuizLanguageType, 
    numQuestions: number, 
    keywords: string[],
) => {
    const response = await openaiClient.chat.completions.create({
        model: process.env.OPENAI_API_MODEL!,
        messages: [
            {
                "role": "system",
                "content": `You will be provided with a target language.`
            },
            {
                "role": "system",
                "content": `
                    Could you please generate a list of fill-in-the-blank questions for sentences in the target language? 
                    Format the output as an array of JSON objects containing ${numQuestions} entries, given the TypeScript types:
                    type Option = { text: string, isCorrect: boolean };
                    type Question = { text: string, options: Option[] };
                    Ensure each question includes a sentence with a blank space that can be filled by selecting the correct option provided in the 'options' array. 
                    Make sure that the correct option for each question can be distinguished from the distractors by having it be the word that makes the most sense for filling in the blank of the sentence, whether that is gramatically, semantically, or contextually. 
                    Generate these questions for the purpose of testing someone's grammatical understanding, semantic understanding, contextual understanding, and overall language comprehension.
                    Ensure that each sentence includes sufficient context to provide a clearer scenario or background story.
                    Feel free to generate the sentences based on topics like hiking, music, movies, yoga, video games, anime, office work, school.
                    `
            },
            {
                "role": "system",
                "content": `Could you output your response as a single stringified array of JSON objects, so that I can easily parse it using the JSON.parse method?`
            },
            {
                "role": "system",
                "content": language
            }
        ],
        temperature: Math.random(),
    });

    const rawGptResponse = response.choices[0].message.content ?? "";
    console.log(rawGptResponse);
    const gptResponse = removeJsonFormattingFromGptResponse(rawGptResponse); // remove json formatting from gpt
    const questionArr = JSON.parse(gptResponse) as GptResponseQuestionType[];

    return questionArr.map(q => {
        return {
            text: q.text,
            category: 'fill-in-the-blank',
            options: q.options?.map(o => {
                return {
                    text: o.text,
                    isCorrect: o.isCorrect,
                    wasChosen: false,
                } as OptionType;
            }),
            responseText: undefined,
            creditedMark: 0,
            feedbackText: "",
        } as QuestionType;
    });
};

export {
    generateQuestionsForQuizAsync,
    generateFillInTheBlankQuestionsAsync
}