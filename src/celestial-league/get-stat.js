async function getStat(data, o, chat) {
    await chat.send("(스탯종류) 승점, 평균승점, 경기수, 1위율, 연대율, 회피율, 평균순위, 화료율*, 방총률*, 리치율*, 리치성공률*, 후로율*, 후로성공률*, 다마율*, 평균타점*")
}

module.exports = getStat;