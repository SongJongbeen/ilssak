async function getIlssak(data, o, chat) {
    let message = data[o].message;

    await chat.send("응원은 10분 전 시작, 경기 시작 20초 전 마감 / 응원 번호는 https://mahjongkr.com/cheerup.php / 응원 배당은 !응원현황");
    await chat.send("응원 방법은 !응원 [선수번호] [포인트]");
}

module.exports = getIlssak;