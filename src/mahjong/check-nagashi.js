async function checkNagashi(chat) {
    const successProbability = 0.03;
    const randomValue = Math.random() * 100;
  
    if (randomValue < successProbability) {
      chat.send("성공!");
    } else {
      chat.send("실패!");
    }
}

module.exports = checkNagashi;