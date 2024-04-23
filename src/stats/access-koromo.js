const { fetchPlayerData, fetchStats, fetchExtendedStats, fetchPlayerRecords } = require('./api');

async function accessKoromo(userName) {
    try {
        const playerData = await fetchPlayerData(userName);
        const pid = playerData.id;
        const start = playerData.latest_timestamp;
        const mode = '16,15,12,11,9,8';

        const stats = await fetchStats(pid, start, mode);
        const extendedStats = await fetchExtendedStats(pid, start, mode);
        const playerRecords = await fetchPlayerRecords(pid, start, mode);

        const result = {...stats, ...extendedStats};
        console.log(result);
        return result;
      
    } catch (error) {
        console.error("Error during accessing Koromo data: ", error);
        return "코로모 검색 중 오류가 발생했습니다";
    }
}


module.exports = accessKoromo;