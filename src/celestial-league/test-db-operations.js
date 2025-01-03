const { 
    getUsersAll, 
    getUserByName, 
    getUserByID, 
    createUser, 
    updatePoints, 
    checkAttendance 
} = require('./db-operations.js');

async function runTests() {
    console.log('=== DB Operations 테스트 시작 ===\n');

    try {
        // 1. 전체 유저 조회 테스트
        console.log('1. 전체 유저 조회 테스트');
        const allUsers = await getUsersAll();
        console.log(`총 ${allUsers.length}명의 유저가 있습니다.`);
        console.log('첫 번째 유저:', allUsers[0]);
        console.log('\n-------------------\n');

        // 2. 특정 유저 조회 테스트
        console.log('2. 특정 유저 조회 테스트');
        const testUserName = allUsers[0].user_name;
        const user = await getUserByName(testUserName);
        console.log('조회된 유저:', user);
        console.log('\n-------------------\n');

        // 3. 새 유저 생성 테스트
        console.log('3. 새 유저 생성 테스트');
        const newUserName = `테스트유저_${Date.now()}`;
        const newUser = await createUser(newUserName);
        console.log('생성된 유저 ID:', newUser);
        console.log('\n-------------------\n');

        // 4. 포인트 업데이트 테스트
        console.log('4. 포인트 업데이트 테스트');
        const pointUpdateResult = await updatePoints(newUserName, 500);
        console.log('포인트 업데이트 결과:', pointUpdateResult);
        console.log('\n-------------------\n');

        // 5. 출석 체크 테스트
        console.log('5. 출석 체크 테스트');
        const attendanceResult = await checkAttendance(newUserName);
        console.log('출석 체크 결과:', attendanceResult);
        console.log('\n-------------------\n');

    } catch (error) {
        console.error('테스트 중 에러 발생:', error);
    }

    console.log('=== 테스트 완료 ===');
}

runTests();
