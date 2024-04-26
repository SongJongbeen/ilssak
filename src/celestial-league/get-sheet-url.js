

async function getSheetUrl(data, o, chat) {
    let parsed_message = message.split(" ");
    const sheetName = parsed_message.slice(1).join(" ");

    if (sheetName === "후원자목록") { await chat.send("https://docs.google.com/spreadsheets/d/1ur8a3-Qikrxj8OjHti2kbD6MdUFYkY9_dHTeAL14H_Y/edit#gid=780832562") }
    else if (sheetName === "다시보기") { await chat.send("https://docs.google.com/spreadsheets/d/1ur8a3-Qikrxj8OjHti2kbD6MdUFYkY9_dHTeAL14H_Y/edit#gid=780832562") }
    else if (sheetName === "선수 소개" || sheetName === "선수소개" || sheetName === "선수") { await chat.send("https://docs.google.com/spreadsheets/d/1ur8a3-Qikrxj8OjHti2kbD6MdUFYkY9_dHTeAL14H_Y/edit#gid=780832562") }
    else if (sheetName === "선수 스탯" || sheetName === "선수스탯" || sheetName === "스탯") { await chat.send("https://docs.google.com/spreadsheets/d/1ur8a3-Qikrxj8OjHti2kbD6MdUFYkY9_dHTeAL14H_Y/edit#gid=780832562") }
    else if (sheetName === "이번주 출전 선수" || sheetName === "이번주") { await chat.send("https://docs.google.com/spreadsheets/d/1ur8a3-Qikrxj8OjHti2kbD6MdUFYkY9_dHTeAL14H_Y/edit#gid=780832562") }
    else if (sheetName === "선수 순위" || sheetName === "선수순위" || sheetName === "순위") { await chat.send("https://docs.google.com/spreadsheets/d/1NBtfUUNvXusbqvPk3kJ-TW6cXSMn2uLPu3HUNWTAPc4/edit#gid=1049628330") }
    else if (sheetName === "기록") { await chat.send("https://docs.google.com/spreadsheets/d/1ur8a3-Qikrxj8OjHti2kbD6MdUFYkY9_dHTeAL14H_Y/edit#gid=780832562") }
    else if (sheetName === "경기결과" || sheetName === "결과" || sheetName === "경기 결과") { await chat.send("https://docs.google.com/spreadsheets/d/1ur8a3-Qikrxj8OjHti2kbD6MdUFYkY9_dHTeAL14H_Y/edit#gid=780832562") }
    else if (sheetName === "정산시트" || sheetName === "정산") { await chat.send("https://docs.google.com/spreadsheets/d/1ur8a3-Qikrxj8OjHti2kbD6MdUFYkY9_dHTeAL14H_Y/edit#gid=780832562") }
    else if (sheetName === "상금분배" || sheetName === "상금" || sheetName === "상금 분배") { await chat.send("https://docs.google.com/spreadsheets/d/1ur8a3-Qikrxj8OjHti2kbD6MdUFYkY9_dHTeAL14H_Y/edit#gid=780832562") }
    else if (sheetName === "패보") { await chat.send("https://docs.google.com/spreadsheets/d/1ur8a3-Qikrxj8OjHti2kbD6MdUFYkY9_dHTeAL14H_Y/edit#gid=780832562") }
    else if (sheetName === "통계" || sheetName === "통계 자료" || sheetName === "통계자료") { await chat.send("https://docs.google.com/spreadsheets/d/1ur8a3-Qikrxj8OjHti2kbD6MdUFYkY9_dHTeAL14H_Y/edit#gid=780832562") }
    else if (sheetName === "인터뷰" || sheetName === "인터뷰 질문" || sheetName === "인터뷰질문") { await chat.send("https://docs.google.com/spreadsheets/d/1ur8a3-Qikrxj8OjHti2kbD6MdUFYkY9_dHTeAL14H_Y/edit#gid=780832562") }
    else { await chat.send("해당 시트를 찾을 수 없습니다")}
}

module.exports = getSheetUrl;