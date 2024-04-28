const fs = require('fs/promises');

async function registerCommand(data, o, chat) {
    console.log("registering command")

    const message = data[o].message;
    const parsed_message = message.split(" ");
    const command = parsed_message[1];
    const commandFunction = parsed_message.slice(2).join(" ");

    const commandJson = "./data/commands.json"
    const commandData = await fs.readFile(commandJson, { encoding: 'utf8' });
    let commands = JSON.parse(commandData);

    commands[command] = commandFunction;

    const updatedCommands = JSON.stringify(commands, null, 2);

    console.log(updatedCommands);

    await fs.writeFile(commandJson, updatedCommands, { encoding: 'utf8' });
    console.log(commands)

    await chat.send("새 명령어가 등록되었습니다");
}

module.exports = registerCommand;