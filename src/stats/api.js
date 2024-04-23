const axios = require('axios');
const BASE_URL = 'https://5-data.amae-koromo.com/api/v2/pl4/';

async function fetchPlayerData(userName) {
    const url = `${BASE_URL}search_player/${encodeURIComponent(userName)}`;
    const response = await axios.get(url);
    return response.data[0]; // 중복여부를 고려하지 않고 첫 번째 결과 사용
}

async function fetchStats(pid, start, mode) {
    const url = `${BASE_URL}player_stats/${pid}/1262304000000/${start}999?mode=${mode}&tag=`;
    const response = await axios.get(url);
    return response.data;
}

async function fetchExtendedStats(pid, start, mode) {
    const url = `${BASE_URL}player_extended_stats/${pid}/1262304000000/${start}999?mode=${mode}&tag=`;
    const response = await axios.get(url);
    return response.data;
}

async function fetchPlayerRecords(pid, start, mode) {
    const url = `${BASE_URL}player_records/${pid}/${start}999/1262304000000?limit=10&mode=${mode}&descending=true&tag=`;
    const response = await axios.get(url);
    return response.data;
}

module.exports = {
    fetchPlayerData,
    fetchStats,
    fetchExtendedStats,
    fetchPlayerRecords
};