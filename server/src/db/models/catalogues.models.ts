import mongoose from 'mongoose'

const optionSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    isCorrect: {
        type: Boolean,
        required: true,
    },
    wasChosen: {
        type: Boolean,
        required: true,
    },
});

const questionSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        enum: ['multiple-choice', 'true-false', 'fill-in-the-blank', 'text-answer'],
        required: true,
    },
    options: [{
        type: optionSchema,
        required: false,
    }],
    responseText: {
        type: String,
        required: false,
    },
    creditedMark: {
        type: Number,
        required: true,
    },
    feedbackText: {
        type: String,
        required: true,
    },
});

const quizSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
    },
    language: {
        type: String,
        enum: ['english', 'japanese', 'tagalog'],
        required: true,
    },
    proficiencyLevel: {
        type: String,
        enum: ['beginner', 'intermediate', 'advanced'],
        required: true,
    },
    questions: [{
        type: questionSchema,
        required: true,
    }],
});

const catalogueSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    quizzes: [{
        type: quizSchema,
        required: true,
    }],
});

const Catalogue = mongoose.model("Catalogue", catalogueSchema);

export { Catalogue }