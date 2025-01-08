const logger = require('./logger.js');
const { getUserByName } = require('./db-operations.js');
const readSheet = require('./read-sheet.js');
const writeSheet = require('./write-sheet.js');

async function buyTicket(data, o, chat) {
    logger.info("buying ticket");

    try {
        let userName = data[o]["author"]["name"];
        let message = data[o]["message"];
        let parsedMessage = message.split(" ");
        let playerName = parsedMessage[1];

        if (playerName === "") { 
            await chat.send("슈참권을 선물할 선수를 입력해주세요"); 
            return; 
        }

        // DB에서 유저 정보 조회
        const user = await getUserByName(userName);
        if (!user) { 
            await chat.send("등록된 계정이 없습니다. 닉네임을 변경하셨다면 관리자에게 문의해주세요"); 
            return; 
        }

        // 포인트 체크 - 정확히 100,000 포인트가 필요
        if (user.current_point < 100000) { 
            await chat.send("포인트가 부족합니다 (필요: 100,000P)"); 
            return; 
        }
       
        // 1. 구글 시트에서 현재 데이터 읽기
        const ticketSheetName = "선수우대권";
        const ticketStartCell = "B4";
        const ticketEndCell = "E1000";
        
        let ticketData;
        try {
            ticketData = await readSheet(ticketSheetName, ticketStartCell, ticketEndCell);
        } catch (sheetError) {
            logger.error("시트 읽기 실패:", {
                error: sheetError.message,
                stack: sheetError.stack,
                name: sheetError.name
            });
            throw sheetError;
        }

        // 2. 새로운 티켓 정보 추가
        const lastRow = ticketData.length;
        ticketData.push([lastRow + 1, userName, playerName, "false"]);

        // 3. DB에 티켓 생성 요청
        const response = await fetch('http://mahjongkr.dothome.co.kr/db-api.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                action: 'createTicket',
                user_name: userName,
                player_name: playerName
            })
        });

        const result = await response.json();
        if (result.error) {
            throw new Error(result.error);
        }

        // 4. 구글 시트에 업데이트
        try {
            await writeSheet(ticketSheetName, ticketStartCell, ticketEndCell, ticketData);
            logger.info("시트 업데이트 성공");
        } catch (writeError) {
            logger.error("시트 쓰기 실패:", {
                error: writeError.message,
                stack: writeError.stack,
                name: writeError.name
            });
            throw writeError;
        }

        await chat.send(`${userName}님이 ${playerName}선수의 슈퍼참여권을 구매하였습니다`);

    } catch (error) {
        logger.error("티켓 구매 중 오류:", {
            message: error.message,
            stack: error.stack,
            name: error.name,
            type: typeof error
        });
        await chat.send("티켓 구매 중 오류가 발생했습니다. 관리자에게 문의해주세요.");
    }
}

module.exports = buyTicket;