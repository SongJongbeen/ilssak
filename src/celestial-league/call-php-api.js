const fetch = require('node-fetch');

async function getDataFromDB() {
    try {
        const response = await fetch('http://mahjongkr.dothome.co.kr/db-api.php');
        const text = await response.text();
        console.log('Raw response:', text);
        
        try {
            const data = JSON.parse(text);
            console.log('Parsed data:', data);
        } catch (parseError) {
            console.error('JSON 파싱 에러:', parseError);
        }
    } catch (error) {
        console.error('Fetch Error:', error);
    }
}

module.exports = getDataFromDB;