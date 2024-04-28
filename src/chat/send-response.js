const readJson = require("../util/read-json.js")

async function sendResponse(data, o, chat) {
    let message = data[o].message;

    const terminology = await readJson("./data/terminology.json");
    const commands = await readJson("./data/commands.json");
    const schedule = await readJson("./data/schedule.json");
    const numbers = await readJson("./data/numbers.json");
    const urls = await readJson("./data/urls.json");

    // 느낌표로 시작하는지 확인
    if (message.startsWith("!")) 
    {
        let inputMessage = message.slice(1);
        if (inputMessage in commands) { await chat.send(commands[inputMessage]) };
        if (inputMessage in schedule) { await chat.send(schedule[inputMessage]) };
    }

    // 물음표로 시작하는지 확인
    if (message.startsWith("?")) 
    {
        let inputMessage = message.slice(1);
        if (inputMessage in terminology) { await chat.send(terminology[inputMessage]); }
        else if (inputMessage in numbers) { await chat.send(numbers[inputMessage]); }
        else if (inputMessage in urls) { await chat.send(urls[inputMessage]); }
        else { return; } 
    }
}

module.exports = sendResponse;
