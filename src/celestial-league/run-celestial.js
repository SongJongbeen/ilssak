const registerQuestion = require('./register-question.js');
const getRecord = require('./get-record.js');
const getThisWeek = require('./get-this-week.js');
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
const { givePoint, takePoint } = require('./give-take.js');
const betPoint = require('./bet-point.js');
const settleBet = require('./settle-bet.js');

async function runCelestial(data, o, chat) {
    message = data[o].message;

    if (message.startsWith("!명령어")) { await getHint(data, o, chat); }
    else if (message.startsWith("!질문")) { await registerQuestion(data, o, chat); }
    else if (message.startsWith("!기록")) { await getRecord(data, o, chat); }
    else if (message.startsWith("!이번주")) { await getThisWeek(data, o, chat); }
    else if (message.startsWith("!순위")) { await getRank(data, o, chat); }
    else if (message.startsWith("!지난주")) { await getResult(data, o, chat); }
    else if (message.startsWith("!상금")) { await getPrize(data, o, chat); }
    else if (message.startsWith("!패보")) { await getPaipu(data, o, chat); }
    else if (message.startsWith("!시트")) { await getSheetUrl(data, o, chat); }
    else if (message.startsWith("!링크")) { await getSheetUrl(data, o, chat); }
    else if (message.startsWith("!1회전")) { await getFirstRound(data, o, chat); }
    else if (message.startsWith("!출첵")) { await getAttendance(data, o, chat); }
    else if (message.startsWith("!구매")) { await buyTicket(data, o, chat); }
    else if (message.startsWith("!포인트")) { await getPoint(data, o, chat); }
    else if (message.startsWith("!등락")) { await getDelta(data, o, chat); }
    else if (message.startsWith("!베팅정보")) { await getBettingInfo(data, o, chat); }
    else if (message.startsWith("!지급")) { await givePoint(data, o, chat); }
    else if (message.startsWith("!차감")) { await takePoint(data, o, chat); }
    else if (message.startsWith("!베팅")) { await betPoint(data, o, chat); }
    else if (message.startsWith("!정산")) { await settleBet(data, o, chat); }
    else { return; }
}

module.exports = runCelestial;
