const fetch = require('node-fetch');

const API_BASE_URL = 'http://mahjongkr.dothome.co.kr';

// 모든 유저 조회
async function getUsersAll() {
    try {
        const response = await fetch(`${API_BASE_URL}/db-api.php?action=read`);
        const text = await response.text();
        return JSON.parse(text);
    } catch (error) {
        console.error('조회 에러:', error);
        throw error;
    }
}

// 이름으로 유저 조회
async function getUserByName(userName) {
    try {
        const users = await getUsersAll();
        return users.find(user => user.user_name === userName);
    } catch (error) {
        console.error('이름으로 조회 에러:', error);
        throw error;
    }
}

// ID로 유저 조회
async function getUserByID(userId) {
    try {
        const users = await getUsersAll();
        return users.find(user => user.user_id === userId);
    } catch (error) {
        console.error('ID로 조회 에러:', error);
        throw error;
    }
}

// 신규 유저 등록
async function createUser(userName) {
    return await fetch(`${API_BASE_URL}/db-api.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            action: 'create',
            user_name: userName,
            current_point: 1000,  // 초기 포인트
            last_attendance: new Date().toISOString().split('T')[0]
        })
    }).then(r => r.json());
}

// 포인트 업데이트
async function updatePoints(userName, pointChange) {
    try {
        const response = await fetch(`${API_BASE_URL}/db-api.php`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                action: 'updatePoints',
                user_name: userName,      // user_id가 아닌 user_name 사용
                point_change: pointChange
            })
        });
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('포인트 업데이트 에러:', error);
        throw error;
    }
}

// 출석 체크 및 보상
async function checkAttendance(userName) {
    return await fetch(`${API_BASE_URL}/db-api.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            action: 'attendance',
            user_name: userName
        })
    }).then(r => r.json());
}


module.exports = { getUsersAll, getUserByName, getUserByID, createUser, updatePoints, checkAttendance };