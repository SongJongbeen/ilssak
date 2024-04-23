const fetchTextWithPuppeteer = require("../util/fetch-txt.js");

async function searchNodocchi(data, o, chat) {
    message = data[o].message;
    parsed_message = message.split(" ");
    user_name = parsed_message[1];
  
    const url = `https://nodocchi.moe/tenhoulog/#!&name=${user_name}`;
  
    const rankSelector = "#div_grade > div > span.spn_lineswrapper > span:nth-child(1) > span:nth-child(1) > span.spn_assumept";
    const rankAttribute = "title";
  
    const stableRankSelector = "#div_stable > div > span > span:nth-child(1) > span:nth-child(1) > span.spn_tlvalue";
    const stableRankProperty = "innerText";
  
    const avgRankSelector = "#div_rss > div > span > div:nth-child(1) > span:nth-child(3) > span.fs_rss_itemvalue";
    const avgRankProperty = "innerText";
  
    try {
      const rank = await fetchTextWithPuppeteer(url, rankSelector, rankAttribute);
      const stableRank = await fetchTextWithPuppeteer(url, stableRankSelector, stableRankProperty);
      const avgRank = await fetchTextWithPuppeteer(url, avgRankSelector, avgRankProperty);
  
      await chat.send(`${user_name}의 현재 단위: ${rank}, 안정 단위: ${stableRank}, 평균 순위: ${avgRank}`);
  
    } catch (error) {
      console.error("Error fetching URL: ", error);
      await chat.send("노돗치 검색 중 오류가 발생했습니다");
    }
}

module.exports = searchNodocchi;