require('dotenv').config();
const { OpenAI } = require('openai');
const { log } = require('winston');

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

async function callOpenAI(userInput) {
    console.log("message: ", userInput);
    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [
                { role: 'system', content: "You are an helpful assistant. You MUST answer in 200 characters in Korean." },
                { role: 'user', content: userInput }
            ]
        });
        console.log(response)
        console.log(response.choices[0].message.content);
        let output = response.choices[0].message.content;
        return output;
    } catch (error) {
        console.error(error);
    }
}

async function askGPT(data, o, chat) {
    let userInput = data[o].message;
    let parsed_message = userInput.split(" ");
    let message = parsed_message.slice(1).join(" ");
    let userName = data[o]["author"]["name"];

    // if (userName !== "금성경") {
    //     await chat.send("질문할 권한이 없습니다");
    //     return;
    // }

    let output = await callOpenAI(message);
    await chat.send(output);
}

module.exports = askGPT;