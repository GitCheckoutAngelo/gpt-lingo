import { QuizQuestionCategoryType } from "../../types/helpers.types";

const QUESTION_CATEGORY_FORMAT: { [key: string]: { title: string, outputFormat: string[], outputFormatNotes: string, questionTemplates: string[] } } = {
    "multiple-choice": {
        title: "multiple-choice (each with 4 options)",
        outputFormat: [
            "type Option = { text: string, isCorrect: boolean }",
            "type Question = { text: string, options: Option[] }"
        ],
        outputFormatNotes: "Make sure to write the questions in English, as they will be read by English speakers, and include only the relevant phrases and words in the target language. The isCorrect value of the correct Option object's isCorrect property must be set to true.",
        questionTemplates: [
            "Vocabulary Questions: What does [word] mean in [target language]?", 
            "Synonym/Antonym: What is a synonym for [word]?", 
            "Grammar Knowledge: How do you conjugate [verb] in present tense, past tense, or future tense?", 
            "Practical Situations: What would you say in [situation] in [target language]?"
        ]
    },
    "fill-in-the-blank": {
        title: "fill-in-the-blank",
        outputFormat: [
            "type Option = { text: string, isCorrect: boolean }",
            "type Question = { text: string, options: Option[] }"
        ],
        outputFormatNotes: "Make sure to write each question in English, as they will be read by English speakers, and only write the '<sentence that is written in the target language>' in the target language. The blanked out word(s) must be replaced with the text '<blank>'.",
        questionTemplates: [
            "Given the sentence: '<sentence that is written in the target language>', which option would be the most appropriate to complete the sentence?",
            "Grammar Practice: Fill in the blank with the correct conjugation of [verb].",
            "Sentence Completion: Complete the sentence with the appropriate word in [target language]."
        ]
    },
};

const PROFICIENCY_LEVEL: { [key: string]: string } = {
    "beginner" : "Beginner Level: Please generate questions suitable for beginners in language learning, emphasizing foundational vocabulary and basic grammar concepts. Focus on common nouns, simple verbs, and straightforward sentence structures that help learners grasp essential language skills. Questions should be clear and accessible, aiming to build confidence and familiarity with the basics of the language. Include prompts that encourage learners to translate simple phrases and identify common vocabulary items, ensuring they establish a strong linguistic foundation from the start.",
    "intermediate" : "Intermediate Level: I'm looking for questions tailored to intermediate learners, which challenge them with broader vocabulary and more complex grammar structures. Include idiomatic expressions, specialized terms related to familiar topics, and contexts that require understanding of past and future tenses, conjunctions, and prepositions. These questions should encourage learners to express opinions, describe experiences, and engage in basic conversations. Aim to deepen comprehension and expand their ability to communicate effectively in practical situations, bridging the gap between basic proficiency and more advanced language skills.",
    "advanced" : "Advanced Level: Can you generate questions aimed at advanced learners in language learning? These questions should explore nuanced vocabulary, technical language, idiomatic expressions, and specialized terminology across a variety of topics. Challenge learners with tasks that require mastery of advanced grammar concepts such as subjunctive mood, complex verb tenses, and sophisticated sentence constructions. Include prompts that encourage critical thinking, analysis of complex texts, and articulate expression of ideas. The focus should be on fostering proficiency that allows learners to navigate sophisticated linguistic and cultural contexts with confidence and precision.",
};

const QUIZ_THEME: { [key: string]: string[] } = {
    "Daily Life and Routine": [
        "Morning Routine: Explore vocabulary and phrases related to waking up, morning activities, breakfast routines, and getting ready for the day.",
        "Evening Routine: Cover vocabulary and actions associated with winding down, dinner preparation, relaxation activities, and bedtime routines.",
        "Workplace Etiquette: Focus on language used in professional environments, including office communication, meetings, email etiquette, and workplace interactions.",
        "Household Chores: Discuss vocabulary for household tasks such as cleaning, laundry, cooking, grocery shopping, and maintaining a home.",
        "Family Relationships: Explore vocabulary related to family members, family roles, family activities, and family celebrations."
    ],
    "Travel and Exploration": [
        "Airport and Flying: Learn essential vocabulary for navigating airports, checking in, going through security, boarding procedures, and in-flight communication.",
        "Local Cuisine Exploration: Explore vocabulary related to trying local dishes, visiting food markets, ordering street food, and dining customs.",
        "Cultural Landmarks: Discuss vocabulary and phrases for exploring famous landmarks, historical sites, museums, and cultural attractions in different regions.",
        "Public Transportation: Cover vocabulary for using buses, trains, taxis, and other modes of public transport in different travel destinations.",
        "Travel Safety: Focus on vocabulary related to travel safety tips, emergency situations, travel insurance, and dealing with unexpected travel issues."
    ],
    "Cultural Traditions and Festivals": [
        "Holiday Traditions: Delve into specific customs, rituals, and traditional celebrations observed during major holidays and special occasions.",
        "Festival Foods: Explore vocabulary related to special dishes, sweets, and drinks associated with festivals and celebrations.",
        "Music and Dance: Learn about traditional music genres, dance styles, performances, and cultural significance during festive events.",
        "Traditional Clothing: Discuss vocabulary for describing traditional attire, ceremonial dress, national costumes, and clothing customs.",
        "Folklore and Legends: Explore vocabulary related to local myths, legends, folktales, superstitions, and storytelling traditions."
    ],
    "Food and Cuisine": [
        "Regional Specialties: Discuss vocabulary and ingredients unique to specific regional cuisines and traditional dishes.",
        "Cooking Techniques: Explore vocabulary related to cooking methods, culinary skills, kitchen utensils, and recipe preparation.",
        "Dining Out Customs: Cover phrases for ordering food, making reservations, tipping etiquette, and expressing preferences or dietary restrictions.",
        "Street Food: Explore vocabulary related to popular street foods, food carts, vendors, and street food festivals in various cultures.",
        "Wine and Spirits: Discuss vocabulary for describing wine varieties, wine regions, tasting notes, cocktail recipes, and alcoholic beverages."
    ],
    "Health and Wellness": [
        "Fitness and Exercise: Focus on vocabulary related to sports activities, gym routines, workout equipment, and physical fitness goals.",
        "Healthy Eating: Discuss vocabulary for nutrition, balanced diets, food groups, dietary habits, and healthy lifestyle choices.",
        "Medical Professions: Explore vocabulary specific to medical professionals, healthcare services, patient care, and medical emergencies.",
        "Mental Health: Cover vocabulary related to emotions, mental well-being, stress management, therapy sessions, and psychological support.",
        "Alternative Medicine: Discuss vocabulary for traditional healing practices, herbal remedies, holistic therapies, and alternative healthcare options."
    ],
    "Business and Professional Communication": [
        "Job Interviews: Learn about common interview questions, preparation tips, professional attire, and communication skills for job seekers.",
        "Negotiation Skills: Discuss vocabulary and phrases used in business negotiations, contract discussions, deal-making, and conflict resolution.",
        "Networking Events: Focus on language for networking, making connections, building professional relationships, and business networking strategies.",
        "Corporate Culture: Explore vocabulary related to company policies, workplace ethics, corporate values, organizational behavior, and team dynamics.",
        "Entrepreneurship: Discuss vocabulary for starting a business, business planning, startup funding, market analysis, and entrepreneurial ventures."
    ],
    "Technology and Innovation": [
        "Digital Privacy: Explore vocabulary related to online security, data protection, privacy settings, cybersecurity threats, and safe internet practices.",
        "Emerging Technologies: Discuss vocabulary for innovations in AI, robotics, virtual reality, augmented reality, and advancements in technology.",
        "Social Media Platforms: Learn about popular social media networks, social networking etiquette, content creation, and digital marketing trends.",
        "E-commerce: Focus on vocabulary related to online shopping, digital payments, e-commerce platforms, customer reviews, and online retail strategies.",
        "Tech Startups: Discuss vocabulary for tech entrepreneurship, venture capital funding, startup accelerators, product development, and tech industry trends."
    ],
    "Art and Entertainment": [
        "Literary Genres: Focus on vocabulary related to different literary genres, authors, literary movements, and notable literary works.",
        "Film Reviews: Discuss vocabulary for analyzing films, movie genres, film industry terminology, and cinematic techniques.",
        "Art Exhibitions: Explore vocabulary for describing artworks, art styles, artistic techniques, art history, and influential artists.",
        "Theater Performances: Cover vocabulary related to live theater productions, acting techniques, playwrights, theater genres, and stagecraft.",
        "Music Genres: Learn about vocabulary for different music genres, music history, music theory, musical instruments, and notable musicians."
    ],
    "Environmental Awareness": [
        "Sustainable Living: Learn about vocabulary related to eco-friendly practices, recycling initiatives, reducing carbon footprint, and sustainable development goals.",
        "Wildlife Conservation: Discuss vocabulary for wildlife protection efforts, endangered species, habitat preservation, and environmental activism.",
        "Climate Change Impact: Explore vocabulary related to global warming, climate science, environmental policies, carbon emissions, and climate action.",
        "Ocean Conservation: Focus on vocabulary for marine conservation efforts, ocean pollution, coral reef protection, sustainable fisheries, and marine biodiversity.",
        "Green Energy Solutions: Discuss vocabulary related to renewable energy sources, energy conservation, green technologies, eco-friendly innovations, and clean energy policies."
    ],
    "Social Issues and Advocacy": [
        "Human Rights Campaigns: Focus on vocabulary for advocating human rights, social justice movements, equality initiatives, and civil liberties.",
        "Community Engagement: Discuss vocabulary related to community organizing, grassroots movements, volunteerism, and local activism.",
        "Global Advocacy Efforts: Explore vocabulary for international advocacy campaigns, humanitarian aid, refugee rights, and global solidarity.",
        "Gender Equality: Cover vocabulary related to gender equity, women's rights, LGBTQ+ advocacy, gender identity, and inclusive language practices.",
        "Racial Justice: Discuss vocabulary for combating racism, promoting diversity, multiculturalism, anti-discrimination efforts, and racial equality."
    ]
};

const getRandomTheme = () => {
    const mainThemeArr = Object.keys(QUIZ_THEME);
    const mainTheme = mainThemeArr[Math.floor(Math.random() * mainThemeArr.length)];

    const subThemeArr = QUIZ_THEME[mainTheme];
    const subTheme = subThemeArr[Math.floor(Math.random() * subThemeArr.length)];

    return subTheme;
};

export {
    PROFICIENCY_LEVEL,
    QUESTION_CATEGORY_FORMAT,
    getRandomTheme
}