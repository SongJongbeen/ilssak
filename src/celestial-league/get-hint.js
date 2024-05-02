const e = require('express');
const getStat = require('./get-stat.js');
const logger = require('./logger.js');

async function getHint(data, o, chat) {
    let messgae = data[o].message;

    let parsed_message = message.split(" ");
    let command = parsed_message[1];

    if (message === "!명령어") {
        const commandLink = "https://drive.google.com/file/d/10dogw-bnTRddO-Lzcnbr8lm83hVPpr40/view?usp=sharing";
        await chat.send(`명령어 모음: ${commandLink}`);
        return;
    }
    else {
        if (command === "질문") {
            await chat.send("(명령어) !질문 [질문하고 싶은 내용] 궁금한 질문을 등록해요!");
        }
        else if (command === "기록") {
            await chat.send("(명령어) !기록 [n주차] [찾고자 하는 내용] 궁금한 대회 기록을 조회해요! (찾을 수 있는 내용: 우승자, 다시보기, 경기결과, 참가자)");
        }
        else if (command === "이번주") {
            await chat.send("(명령어) !이번주 [*찾고자 하는 스탯] 이번주 출전선수 명단 & 스탯을 조회해요!");
            await getStat(data, o, chat);
        }
        else if (command === "순위") {
            await chat.send("(명령어) !순위 [*선수 이름] 궁금한 선수의 순위를 조회해요");
        }
        else if (command === "지난주") {
            await chat.send("(명령어) !지난주 지난주 대회 결과를 조회해요");
        }
        else if (command === "상금") {
            await chat.send("(명령어) !상금 [선수 이름] 궁금한 선수의 누적상금을 조회해요");
        }
        else if (command === "패보") {
            await chat.send("(명령어) !패보 [주차] [*관점] 궁금한 주차의 패보를 조회해요");
        }
        else if (command === "링크" || command === "시트") {
            await chat.send("(명령어) !링크 or !시트 [찾고자 하는 시트] 궁금한 시트의 링크를 조회해요");
        }
        else if (command === "1회전") {
            await chat.send("(명령어) !1회전 1회전 결과를 조회해요");
        }
        else if (command === "출첵") {
            await chat.send("(명령어) !출첵 출석체크하고 포인트를 획득해요!");
        }
        else if (command === "응원") {
            await chat.send("(명령어) !응원 [선수번호] [응원금액] 1등 선수를 예측하고 포인트를 걸어요!");
        }
        else if (command === "구매") {
            await chat.send("(명령어) !구매 [선수이름] 10,000 포인트를 지불해 슈퍼참여권을 구매해요!");
        }
        else if (command === "포인트") {
            await chat.send("(명령어) !포인트 현재 포인트 현황을 조회해요");
        }
        else if (command === "등락") {
            await chat.send("(명령어) !등락 [*시청자 이름] 최근 포인트 등락 정보를 조회해요");
        }
        else if (command === "응원정보") {
            await chat.send("(명령어) !응원정보 현재 본인의 응원 정보를 조회해요");
        }
        else if (command === "응원현황") {
            await chat.send("(명령어) !응원현황 현재 응원 현황을 조회해요");
        }
        else {
            await chat.send("해당 명령어를 찾을 수 없습니다");
        }
    }
}

module.exports = getHint;