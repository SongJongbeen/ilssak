const registerQuestion = require('./register-question.js');
const getRecord = require('./get-record.js');
const getThisWeek = require('./get-this-week.js');
const getStat = require('./get-stat.js');
const getRank = require('./get-ranking.js');
const getResult = require('./get-result.js');
const getPrize = require('./get-prize.js');
const getPaipu = require('./get-paipu.js');
const getSheetUrl = require('./get-sheet-url.js');
const getFirstRound = require('./get-first-round.js');
const getHint = require('./get-hint.js');
const getAttendance = require('./get-attendance.js');
const buyTicket = require('./buy-ticket.js');
const getPoint = require('./get-point.js');
const getDelta = require('./get-delta.js');
const getBettingInfo = require('./get-betting-info.js');
const getBettingRate = require('./get-betting-rate.js');
const { givePoint, takePoint } = require('./give-take.js');
const betPoint = require('./bet-point.js');
const settleBet = require('./settle-bet.js');
const logger = require('./logger.js');
let isBetting = false;

async function runCelestial(data, o, chat) {
    message = data[o].message;

    if (message === "!응원시작") {
        if (data[o]["author"]["name"] === "금성경" || data[o]["author"]["name"] === "일급천재") {
            isBetting = true;
            await chat.send("응원이 시작되었습니다. !응원 [선수번호] [포인트]로 응원하세요!");
            return;
        }
        else { await chat.send("응원을 시작할 권한이 없습니다."); }
    }

    if (message === "!응원종료") {
        if (data[o]["author"]["name"] === "금성경" || data[o]["author"]["name"] === "일급천재") {
            isBetting = false;
            await chat.send("응원이 종료되었습니다.");  // 현재 응원 배당률 현황
            await getBettingRate(data, o, chat);
            return;
        }
        else { await chat.send("응원을 종료할 권한이 없습니다."); }
    }

    try {
        if (message.startsWith("!명령어")) { await getHint(data, o, chat); }
        else if (message.startsWith("!질문")) { await registerQuestion(data, o, chat); }
        else if (message.startsWith("!기록")) { await getRecord(data, o, chat); }
        else if (message.startsWith("!이번주")) { await getThisWeek(data, o, chat); }
        else if (message.startsWith("!스탯목록")) { await getStat(data, o, chat); }
        else if (message.startsWith("!순위")) { await getRank(data, o, chat); }
        else if (message.startsWith("!지난주")) { await getResult(data, o, chat); }
        else if (message.startsWith("!상금")) { await getPrize(data, o, chat); }
        else if (message.startsWith("!패보")) { await getPaipu(data, o, chat); }
        else if (message.startsWith("!시트")) { await getSheetUrl(data, o, chat); }
        else if (message.startsWith("!링크")) { await getSheetUrl(data, o, chat); }
        else if (message.startsWith("!1회전")) { await getFirstRound(data, o, chat); }
        else if (message.startsWith("!1경기")) { await getFirstRound(data, o, chat); }
        else if (message.startsWith("!출첵")) { await getAttendance(data, o, chat); }
        else if (message.startsWith("!구매")) { await buyTicket(data, o, chat); }
        else if (message.startsWith("!포인트")) { await getPoint(data, o, chat); }
        else if (message.startsWith("!등락")) { await getDelta(data, o, chat); }
        else if (message.startsWith("!응원정보")) { await getBettingInfo(data, o, chat); }
        else if (message.startsWith("!응원현황")) { await getBettingRate(data, o, chat); } 
        else if (message.startsWith("!지급")) { await givePoint(data, o, chat); }
        else if (message.startsWith("!차감")) { await takePoint(data, o, chat); }
        else if (message.startsWith("!응원")) { 
            if (!isBetting) { await chat.send("현재 응원할 수 있는 시간이 아니에요"); }
            else { await betPoint(data, o, chat); }
        }
        else if (message.startsWith("!정산")) { await settleBet(data, o, chat); }
        else { return; }
    }
    catch (error) {
        console.error(error);
        await chat.send("명령어 실행 중 오류가 발생했습니다");
    }
}

module.exports = runCelestial;
