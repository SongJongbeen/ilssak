const registerPaipu = require('../mahjong/register-paipu.js');
const registerQuestion = require('../mahjong/register-question.js');
const registerSchedule = require('../util/register-schedule.js');
const registerWeeklySchedule = require('../util/register-weekly-schedule.js');
const registerCommand = require('../util/register-command.js');
const calculateEfficiency = require('../mahjong/calculate-efficiency.js');
const calculateScore = require('../mahjong/calculate-score.js');
const checkCondition = require('../mahjong/check-condition.js');
const calculateUma = require('../mahjong/calculate-uma.js');
const searchNodocchi = require('../stats/search-nodocchi.js');
const searchKoromo = require('../stats/search-koromo.js');
const searchStat = require('../stats/search-stat.js');
const who = require('../stats/who.js');
const tsumo = require('../mahjong/tsumo.js');
const rollDice = require('../mahjong/roll-dice.js');
const drawHand = require('../mahjong/draw-hand.js');
const todayYaku = require('../mahjong/today-yaku.js');
const checkNagashi = require('../mahjong/check-nagashi.js');
const checkIppatsu = require('../mahjong/check-ippatsu.js');
const callTsumo = require('../mahjong/call-tsumo.js');
const callRon = require('../mahjong/call-ron.js');
const sakuraGacha = require('../mahjong/sakura-gacha.js');
const bambooGacha = require('../mahjong/bamboo-gacha.js');
const collabo = require('../mahjong/collabo.js');
const askGPT = require('../util/ask-gpt.js');
const organizeRanking = require('../mahjong/organize-ranking.js');
const calculateRankPoint = require('../mahjong/calculate-rank-point.js');

async function runFunction(data, o, chat, streamerName) {
    message = data[o].message;

    try {
        if (message.startsWith("!패보") && streamerName !== "모찌유키 MochiYuki") { await registerPaipu(data, o, chat, streamerName); }
        else if (message.startsWith("!신청")) { await registerPaipu(data, o, chat, streamerName); }
        else if (message.startsWith("!질문")) { await registerQuestion(data, o, chat, streamerName); }
        else if (message.startsWith("!스케줄")) { await registerSchedule(data, o, chat, streamerName); }
        // else if (message.startsWith("!일정")) { await registerWeeklySchedule(data, o, chat, streamerName); }
        else if (message.startsWith("!명령어")) { await registerCommand(data, o, chat); }
        else if (message.startsWith("!패효율")) { calculateEfficiency(data, o, chat); }
        else if (message.startsWith("!점수")) { calculateScore(data, o, chat); }
        else if (message.startsWith("!조건")) { checkCondition(data, o, chat); }
        else if (message.startsWith("!환산점수")) { calculateUma(data, o, chat); }
        else if (message.startsWith("!노돗치")) { searchNodocchi(data, o, chat); }
        else if (message.startsWith("!코로모")) { searchKoromo(data, o, chat); }
        else if (message.startsWith("!스탯")) { searchStat(data, o, chat); }
        else if (message.startsWith("!누구")) { who(data, o, chat); }
        else if (message.startsWith("!draw")) { await tsumo(chat); }
        else if (message.startsWith("!주사위")) { await rollDice(chat); }
        else if (message.startsWith("!배패")) { await drawHand(chat); }
        else if (message.startsWith("!오늘의역")) { await todayYaku(chat); }
        else if (message.startsWith("!나가시")) { await checkNagashi(chat); }
        else if (message.startsWith("!일발")) { await checkIppatsu(chat); }
        else if (message.startsWith("!쯔모")) { await callTsumo(data, o, chat); }
        else if (message.startsWith("!론")) { await callRon(data, o, chat); }
        else if (message.startsWith("!벚꽃의길")) { await sakuraGacha(chat); }
        else if (message.startsWith("!콜라보")) { await collabo(chat); }
        else if (message.startsWith("!죽림의길")) { await bambooGacha(chat); }
        else if (message.startsWith("!기록정리")) { await organizeRanking(data, o, chat, streamerName); }
        else if (message.startsWith("!기록")) { await calculateRankPoint(data, o, chat, streamerName); }
        else { return; }
    }
    catch (err) { console.error(err); await chat.send("명령어 실행중 오류가 발생했습니다"); return; }
}

module.exports = runFunction;
