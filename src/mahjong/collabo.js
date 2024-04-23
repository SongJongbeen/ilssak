async function collabo(chat) {
    // 0.005 * 0.59 * 0.25의 확률로 등장하는 캐릭터를 뽑는데 몇번의 시도가 필요할지 시뮬레이션
    const collaboProbability = 0.005 * 0.59;
    const targetProbability = 0.005 * 0.59 * 0.25;
    let collaboCeiling = "";
    let targetCeiling = "";
  
    let collaboAttempts = 0;
    while (Math.random() > collaboProbability) {
      collaboAttempts++;
    }
  
    let targetAttempts = 0;
    while (Math.random() > targetProbability) {
      targetAttempts++;
    }
  
    if (collaboAttempts > 600) { collaboAttempts = 150; collaboCeiling = "[천장]";}
    if (targetAttempts > 150) { targetAttempts = 150; targetCeiling = "[천장]"; }

    await chat.send(`콜라보 가챠 시뮬레이션: ${collaboCeiling}${collaboAttempts}회 / ${targetCeiling}${targetAttempts}회`);
}

module.exports = collabo;