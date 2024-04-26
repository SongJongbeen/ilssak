const registerQuestion = require('./register-question.js');
const getRecord = require('./get-record.js');
const getThisWeek = require('./get-this-week.js');
const getRank = require('./get-ranking.js');
const getResult = require('./get-result.js');
const getPrize = require('./get-prize.js');
const getPaipu = require('./get-paipu.js');
const getSheetUrl = require('./get-sheet-url.js');
const getFirstRound = require('./get-first-round.js');

async function runCelestial(data, o, chat) {
    message = data[o].message;

    if (message.startsWith("!질문")) { await registerQuestion(data, o, chat); }
    else if (message.startsWith("!기록")) { await getRecord(data, o, chat); }
    else if (message.startsWith("!이번주")) { await getThisWeek(data, o, chat); }
    else if (message.startsWith("!순위")) { await getRank(data, o, chat); }
    else if (message.startsWith("!지난주")) { await getResult(data, o, chat); }
    else if (message.startsWith("!상금")) { await getPrize(data, o, chat); }
    else if (message.startsWith("!패보")) { await getPaipu(data, o, chat); }
    else if (message.startsWith("!시트")) { await getSheetUrl(data, o, chat); }
    else if (message.startsWith("!링크")) { await getSheetUrl(data, o, chat); }
    else if (message.startsWith("!1회전")) { await getFirstRound(data, o, chat); }
    else { return; }
}

module.exports = runCelestial;
