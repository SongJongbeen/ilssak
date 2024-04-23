const readJson = require("../util/read-json.js");
const pickRandom = require("../util/pick-random.js");

async function callRon(data, o, chat) {
    const ronJson = "./data/ron-message.json";
    const ronData = await readJson(ronJson);
    const userInput = data[o].message;
  
    // userInput이 !론인 경우
    if (userInput === "!론") {
      const result = await pickRandom(ronData);
      console.log(result);
      await chat.send(result);
    }
  
    // userInput이 !론 [key]인 경우
    else {
      const character_name = userInput.split(" ")[1];
      try { const result = await ronData[character_name]; await chat.send(result); }
      catch (error) { const result = "해당 캐릭터는 등록되어있지 않아요"; await chat.send(result); }
    }
}


module.exports = callRon;