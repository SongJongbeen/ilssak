const readJson = require("../util/read-json.js");
const pickRandom = require("../util/pick-random.js");

async function callTsumo(data, o, chat) {
  const tsumoJson = "./data/tsumo-message.json";
  const tsumoData = await readJson(tsumoJson);
  const userInput = data[o].message;

  // userInput이 !쯔모인 경우
  if (userInput === "!쯔모") {
    const result = await pickRandom(tsumoData);
    console.log(result);
    await chat.send(result);
  }

  // userInput이 !쯔모 [key]인 경우
  else {
    const character_name = userInput.split(" ")[1];
    try { const result = await tsumoData[character_name]; await chat.send(result); }
    catch (error) { const result = "해당 캐릭터는 등록되어있지 않아요"; await chat.send(result); }
  }
}


module.exports = callTsumo;