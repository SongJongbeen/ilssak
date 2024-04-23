const buzzk = require("buzzk");
const fs = require('fs').promises;
const runCelestial = require("./src/celestial-league/run-celestial.js");
const runFunction = require("./src/chat/run-function.js");
const sendResponse = require("./src/chat/send-response.js");

require("dotenv").config({ path: ".env" })

streamerName = "금성경";

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
    console.log(recentChat);

    chat.onMessage(async (data) => { //채팅이 왔을 때
        for (let o in data) {
            console.log(data[o].message);

            if (data[o].message === "!on") {
                isActive = true;
                chat.send("일싹이가 깨어났습니다!");
            }

            if (data[o].message === "!off") {
                isActive = false;
                chat.send("일싹이 자러갈게~");
            }

            if (isActive) {
                if (streamerName === "금성경") {
                    runCelestial(data, o, chat);
                }
    
                else {
                    runFunction(data, o, chat);
                    sendResponse(data, o, chat);
                }
            }
       
            let userInfo = await chat.getUserInfo(data[o].author.id);
        	console.log(userInfo); //채팅 보낸 유저의 정보
        }
    });
}

test(streamerName);
