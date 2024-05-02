const logger = require('./logger.js');

async function getSheetUrl(data, o, chat) {
    let parsed_message = message.split(" ");
    const sheetName = parsed_message.slice(1).join(" ");

    if (sheetName === "후원자목록") { await chat.send("https://docs.google.com/spreadsheets/d/1EzGm2owEbp0GGRGS5TQ15Qmzt1Lla8D7zzSDkj09gtU/edit#gid=780832562") }
    else if (sheetName === "다시보기") { await chat.send("https://docs.google.com/spreadsheets/d/1EzGm2owEbp0GGRGS5TQ15Qmzt1Lla8D7zzSDkj09gtU/edit#gid=176884367") }
    else if (sheetName === "선수 소개" || sheetName === "선수소개" || sheetName === "선수") { await chat.send("https://docs.google.com/spreadsheets/d/1EzGm2owEbp0GGRGS5TQ15Qmzt1Lla8D7zzSDkj09gtU/edit#gid=168542119") }
    else if (sheetName === "선수 스탯" || sheetName === "선수스탯" || sheetName === "스탯") { await chat.send("https://docs.google.com/spreadsheets/d/1EzGm2owEbp0GGRGS5TQ15Qmzt1Lla8D7zzSDkj09gtU/edit#gid=1542329386") }
    else if (sheetName === "이번주 출전 선수" || sheetName === "이번주") { await chat.send("https://docs.google.com/spreadsheets/d/1EzGm2owEbp0GGRGS5TQ15Qmzt1Lla8D7zzSDkj09gtU/edit#gid=2102034249") }
    else if (sheetName === "선수 순위" || sheetName === "선수순위" || sheetName === "순위") { await chat.send("https://docs.google.com/spreadsheets/d/1EzGm2owEbp0GGRGS5TQ15Qmzt1Lla8D7zzSDkj09gtU/edit#gid=1049628330") }
    else if (sheetName === "기록") { await chat.send("https://docs.google.com/spreadsheets/d/1EzGm2owEbp0GGRGS5TQ15Qmzt1Lla8D7zzSDkj09gtU/edit#gid=1189731642") }
    else if (sheetName === "경기결과" || sheetName === "결과" || sheetName === "경기 결과") { await chat.send("https://docs.google.com/spreadsheets/d/1EzGm2owEbp0GGRGS5TQ15Qmzt1Lla8D7zzSDkj09gtU/edit#gid=132360717") }
    else if (sheetName === "정산시트" || sheetName === "정산") { await chat.send("https://docs.google.com/spreadsheets/d/1EzGm2owEbp0GGRGS5TQ15Qmzt1Lla8D7zzSDkj09gtU/edit#gid=2140698414") }
    else if (sheetName === "상금분배" || sheetName === "상금" || sheetName === "상금 분배") { await chat.send("https://docs.google.com/spreadsheets/d/1EzGm2owEbp0GGRGS5TQ15Qmzt1Lla8D7zzSDkj09gtU/edit#gid=0") }
    else if (sheetName === "패보") { await chat.send("https://docs.google.com/spreadsheets/d/1EzGm2owEbp0GGRGS5TQ15Qmzt1Lla8D7zzSDkj09gtU/edit#gid=717962795") }
    else if (sheetName === "통계" || sheetName === "통계 자료" || sheetName === "통계자료") { await chat.send("https://docs.google.com/spreadsheets/d/1EzGm2owEbp0GGRGS5TQ15Qmzt1Lla8D7zzSDkj09gtU/edit#gid=1264770992") }
    else if (sheetName === "인터뷰" || sheetName === "인터뷰 질문" || sheetName === "인터뷰질문") { await chat.send("https://docs.google.com/spreadsheets/d/1EzGm2owEbp0GGRGS5TQ15Qmzt1Lla8D7zzSDkj09gtU/edit#gid=2104646928") }
    else if (sheetName === "베팅" || sheetName === "포인트" || sheetName === "토토") { await chat.send("https://docs.google.com/spreadsheets/d/1EzGm2owEbp0GGRGS5TQ15Qmzt1Lla8D7zzSDkj09gtU/edit#gid=1302846807") }
    else { await chat.send("해당 시트를 찾을 수 없습니다")}
}

module.exports = getSheetUrl;
