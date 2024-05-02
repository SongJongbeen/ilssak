const buzzk = require("buzzk");
const fs = require('fs').promises;
const runCelestial = require("./src/celestial-league/run-celestial.js");
const runFunction = require("./src/chat/run-function.js");
const sendResponse = require("./src/chat/send-response.js");
const logger = require('./src/celestial-league/logger.js');
const checkAuthority = require("./src/util/check-authority.js");

require("dotenv").config({ path: ".env" })

let streamerName = "금성경";    // 테스트중

buzzk.login(process.env.NID_AUT, process.env.NID_SES); //로그인

const buzzkChat = buzzk.chat;

async function test (streamerName) {

    let isActive = true; //활성화 여부

    let chSearch = await buzzk.channel.search(streamerName); //채널 검색
    
    let channel = chSearch[0]; //검색 결과 첫번째 채널

    const lvDetail = await buzzk.live.getDetail(channel.channelID); //현재 방송 정보

    let chat = new buzzkChat(channel.channelID);
    await chat.connect(); //채팅창 연결

    let recentChat = await chat.getRecentChat(); //최근 채팅 가져오기 (기본값 50개)
    logger.info(recentChat);

    chat.onMessage(async (data) => { //채팅이 왔을 때
        for (let o in data) {
            logger.info(data[o].message);

            if (data[o].message === "!on") {
                if (await checkAuthority(data, o, chat, streamerName)) {
                    if (isActive) { chat.send("일싹이가 이미 깨어있습니다"); return; } // 이미 활성화 되어있을 때 (중복 방지)
                    isActive = true;
                    chat.send("일싹이가 깨어났습니다!");
                } else { chat.send("일싹이를 깨울 권한이 없습니다"); }
            }

            if (data[o].message === "!off") {
                if (await checkAuthority(data, o, chat, streamerName)) {
                    if (!isActive) { chat.send("일싹이가 이미 잠들어있습니다"); return; } // 이미 비활성화 되어있을 때 (중복 방지)
                    isActive = false;
                    chat.send("일싹이 자러갈게~");
                } else { chat.send("일싹이를 재울 권한이 없습니다"); }
            }

            if (isActive) {
                if (streamerName === "일급천재") {
                    runCelestial(data, o, chat);
                }

                else {
                    runFunction(data, o, chat, streamerName);
                    sendResponse(data, o, chat);
                }
            }
       
            let userInfo = await chat.getUserInfo(data[o].author.id);
        	logger.info(userInfo); //채팅 보낸 유저의 정보
        }
    });
}

test("금성경");
// test("일급천재");
// test("캐피탈호");
// test("병겜임");
// test("해모수보컬");
