const logger = require('./logger.js');
const { Mutex } = require('async-mutex');
const { getUserByName, checkAttendance } = require('./db-operations.js');

const mutex = new Mutex();

async function getAttendance(data, o, chat) {
    const release = await mutex.acquire();
    
    try {
        logger.info("getting attendance");

        let userName = data[o]["author"]["name"];

        // DB에서 유저 확인
        const user = await getUserByName(userName);
        if (!user) {
            await chat.send("등록된 계정이 없습니다. 닉네임을 변경하셨다면 관리자에게 문의해주세요");
            return;
        }

        // 출석 체크 시도
        const result = await checkAttendance(userName);
        
        if (result.affected === 0) {
            await chat.send("이미 출석체크를 하셨습니다");
            return;
        }
   
        await chat.send(`${userName}님 출석체크 완료!`);
    } finally {
        release();
    }
}

module.exports = getAttendance;
