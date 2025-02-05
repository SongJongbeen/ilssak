const logger = require('./logger.js');
const { Mutex } = require('async-mutex');
const { getUserByName, createUser, checkAttendance } = require('./db-operations.js');

const mutex = new Mutex();

async function getAttendance(data, o, chat) {
    const release = await mutex.acquire();
    
    try {
        logger.info("getting attendance");

        let userName = data[o]["author"]["name"];

        // DB에서 유저 확인
        let user = await getUserByName(userName);
        if (!user) {
            // 신규 유저 자동 등록
            await createUser(userName);
            user = await getUserByName(userName);
            logger.info(`New user created: ${userName}`);
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
