const dotenv = require('dotenv');
const Groq = require('groq-sdk');

dotenv.config();

const groq = new Groq({
    apiKey: process.env.API_KEY
});

async function getGroqChatCompletion() {
    return groq.chat.completions.create({
        messages: [
            {
                role: "user",
                content: "Which LLM model you are using"
            }
        ],
        "model": "llama3-8b-8192",
        "max_tokens": 500,
        "top_p": 1,
        "stream": true,
    });
}


async function main() {
    const chatCompletion = await getGroqChatCompletion();
    // Print the completion returned by the LLM.
    // process.stdout.write(chatCompletion.choices[0]?.message?.content || "");

    for await (const chunk of chatCompletion) {
        process.stdout.write(chunk.choices[0]?.delta?.content || '');
      }
}

main()