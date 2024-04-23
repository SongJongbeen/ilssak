async function rollDice(chat) {
    const dice1 = Math.floor(Math.random() * 6) + 1;
    const dice2 = Math.floor(Math.random() * 6) + 1;
  
    const result = dice1 + dice2;
    let arrow = "";
    if (result === 5 || result === 9) { arrow = "↓"; }
    else if (result === 2 || result === 6 || result === 10) { arrow = "→"; }
    else if (result === 3 || result === 7 || result === 11) { arrow = "↑"; }
    else if (result === 4 || result === 8 || result === 12) { arrow = "←"; }
    await chat.send(`주사위: ${dice1}, ${dice2} (합계: ${result} ${arrow})`);
}

module.exports = rollDice;