import {OpenAI} from 'openai';

const openai = new OpenAI({
    baseURL: process.env.AI_BASE_URL,
    apiKey: process.env.AI_API_KEY,
});

enum AiRole {
    User = "user",
    System = "system",
    Developer = "developer",
    Tool = "tool",
    Function = "function",
    Assistant = 'Assistant'
}

export default async (message: string) => {
    const completion = await openai.chat.completions.create({
        model: 'openai/gpt-4o-mini',
        messages: [
            {
                role: "user",
                content: message,
            },
            {
                role: "system",
                content: "تو فقط مجازی به سوالاتی پاسخ بدی که مربوط به مواد غذایی هستند. اگر سؤال خارج از این حوزه بود، فقط بگو: «من فقط به سوالات مرتبط با مواد غذایی پاسخ می‌دم.»"
            },
        ],
    });

    return {
        choices: completion.choices,
        message: completion.choices[0].message
    }
}