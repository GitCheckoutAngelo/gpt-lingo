const removeJsonFormattingFromGptResponse = (rawRes: string) => {
    let outRes = rawRes;
    if (outRes.startsWith("```json") || outRes.startsWith("```typescript")) {
        outRes = outRes.trim();
        const startIndex = outRes.indexOf('[');
        outRes = outRes.slice(startIndex, outRes.length-3).trim();
    }
    return outRes;
};

export {
    removeJsonFormattingFromGptResponse,
}