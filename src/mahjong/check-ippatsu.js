async function checkIppatsu(chat) {
    const successProbability = 0.1;
    const randomValue = Math.random() * 100;
  
    if (randomValue < successProbability) {
      chat.send("이게 되네..?");
    } else {
      chat.send("되겠냐구~");
    }
}

module.exports = checkIppatsu;