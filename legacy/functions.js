const axios = require('axios'); // 상단에 정적으로 axios 모듈을 로드
const fs = require("fs").promises;

async function registerPaipu(data, o, chat) {
    console.log("registering paipu");

    message = data[o].message;
    parsed_message = message.split(" ");
    paipu_code = parsed_message[1];
    user_name = data[o]["author"]["name"];

    const dateStr = new Date().toLocaleString("en-US", {timeZone: "Asia/Seoul"});
    const [datePart] = dateStr.split(", ");
    const [month, day, year] = datePart.split("/");

    const formattedMonth = month.padStart(2, "0");
    const formattedDay = day.padStart(2, "0");

    const formattedDate = `${year}${formattedMonth}${formattedDay}`;
    
    url = `https://script.google.com/macros/s/AKfycby_BI4zIG9Scc9cLuMNy-PN-cQjrUJHGolTc8aZfD9oMZ7qDbqU3Frhv-hp-1q8cHNMoQ/exec?User=${user_name}&Date=${formattedDate}&Paipu=${paipu_code}`;

    console.log(url);

    try {
        const fetch = (await import('node-fetch')).default;
        const response = await fetch(url);
        const text = await response.text();
        await chat.send(text);
    } catch (error) {
        console.error("Error fetching URL: ", error);
        await chat.send("패보 등록 중 오류가 발생했습니다");
    }
}

async function calculateEfficiency(data, o, chat) {
    const { tilesToHand, RuleSet } = await import('mahjong-tile-efficiency');
    console.log("calculating efficiency");

    message = data[o].message;
    parsed_message = message.split(" ");
    
    tile_input = parsed_message[1];
    tile_list = await splitTiles(tile_input);

    console.log(tile_list);
    if (tile_list.length <= 13) { chat.send("소패네요~"); return; }
    else if (tile_list.length > 14) { chat.send("다패네요~"); return; }
    

    const hand = tilesToHand(tile_list);
    
    const riichiRule = new RuleSet('Riichi');
    const shantenResult = riichiRule.calShanten(hand);
    const ukeireResult = riichiRule.calUkeire(hand)['normalDiscard'];
    const sumUkeire = sortObjectByValues(sumValues(ukeireResult));
    const topUkeire = formatTopUkeire(sumUkeire, 5);

    console.log(shantenResult);
    console.log(sumUkeire);

    response = `(${shantenResult}샹텐) 유효매수: ${topUkeire}`;
    if (shantenResult === 0) { response = `(텐파이!) 대기매수: ${topUkeire}`; }
    chat.send(response);
}

async function calculateUma(data, o, chat) {
    console.log("calculating uma");

    message = data[o].message;
    parsed_message = message.split(" ");
    const score = parsed_message[1];
    const place = parsed_message[2];

    const uma = {1: 125, 2: 60, 3: -5, 4: -225};
    const result = ((score - 25000) / 1000) + uma[place];

    chat.send(`환산점수: ${result}`);
}

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

async function searchKoromo(data, o, chat) {
  message = data[o].message;
  parsed_message = message.split(" ");
  user_name = parsed_message[1];

  try {
    const result = await accessKoromo(user_name, stat=false);
    await chat.send(result);
  } catch (error) {
    console.error("Error fetching player data: ", error);
    await chat.send("코로모 검색 중 오류가 발생했습니다");
  }
}

async function searchStat(data, o, chat) {
  message = data[o].message;
  parsed_message = message.split(" ");
  user_name = parsed_message[1];

  try {
    const result = await accessKoromo(user_name, stat=true);
    await chat.send(result);
  } catch (error) {
    console.error("Error fetching player data: ", error);
    await chat.send("코로모 검색 중 오류가 발생했습니다");
  }
}

async function tsumo() {
  const tileArray = generateMahjongTiles();
  const randomIndex = Math.floor(Math.random() * tileArray.length);
  console.log(tileArray)
  console.log(tileArray[randomIndex])
  return tileArray[randomIndex];
}

async function dice(chat) {
  const dice1 = Math.floor(Math.random() * 6) + 1;
  const dice2 = Math.floor(Math.random() * 6) + 1;

  const result = dice1 + dice2;
  await chat.send(`주사위: ${dice1}, ${dice2} (합계: ${result})`);
}

async function drawHand(chat) {
  const hand = [];
  const tiles = generateMahjongTiles();
  const tilesCopy = [...tiles]; // 타일 세트의 복사본을 만듭니다.

  for (let i = 0; i < 14; i++) {
      const tileIndex = Math.floor(Math.random() * tilesCopy.length); // 무작위 인덱스 선택
      hand.push(tilesCopy[tileIndex]); // 선택된 타일을 핸드에 추가
      tilesCopy.splice(tileIndex, 1); // 사용된 타일은 배열에서 제거
  }

  chat.send(`배패: ${hand.join(", ")}`);
  return hand;
}

async function todayYaku(chat) {
  const yakuDict = {
    "리치": 0.451,
    "역패": 0.4,
    "탕야오": 0.214,
    "핑후": 0.199,
    "멘젠쯔모": 0.176,
    "일발": 0.102,
    "혼일색": 0.063,
    "이페코": 0.047,
    "또이또이": 0.039,
    "삼색동순": 0.034,
    "치또이": 0.025,
    "일기통관": 0.017,
    "찬타": 0.012,
    "청일색": 0.009,
    "산안커": 0.007,
    "하저로어": 0.006,
    "준찬타": 0.003,
    "해저로월": 0.003,
    "영상개화": 0.002,
    "더블 리치": 0.001,
    "소삼원": 0.001,
    "혼노두": 0.0008,
    "삼색동각": 0.0005,
    "량페코": 0.0005,
    "창깡": 0.0005,
    "스안커": 0.0004,
    "국사무쌍": 0.0004,
    "대삼원": 0.0003,
    "n사희": 0.0001,
    "자일색": 0.00008,
    "산깡쯔": 0.00005,
    "청노두": 0.00001,
    "녹일색": 0.00001,
    "구련보등": 0.000004,
    "천화": 0.000003,
    "스깡쯔": 0.000002
  };

  const totalWeight = Object.values(yakuDict).reduce((sum, weight) => sum + weight, 0);

  // 무작위 수 생성 (0 이상 totalWeight 미만)
  let random = Math.random() * totalWeight;

  // 확률 가중치에 따라 키 선택
  for (const [yaku, weight] of Object.entries(yakuDict)) {
      random -= weight;
      if (random < 0) {
          console.log(`오늘의 역: ${yaku}`)
          chat.send(`오늘의 역: ${yaku}`);
          return yaku;
      }
  }

}

async function checkNagashi(chat) {
  const successProbability = 0.03;
  const randomValue = Math.random() * 100;

  if (randomValue < successProbability) {
    chat.send("성공!");
  } else {
    chat.send("실패!");
  }
}

async function checkIppatsu(chat) {
  const successProbability = 0.1;
  const randomValue = Math.random() * 100;

  if (randomValue < successProbability) {
    chat.send("이게 되네..?");
  } else {
    chat.send("되겠냐구~");
  }
}

async function callRon(data, o, chat) {
  const ronJson = "chzzk/ron-message.json";
  const ronData = await readJson(ronJson);
  const userInput = data[o].message;

  // userInput이 !론인 경우
  if (userInput === "!론") {
    const result = await pickRandom(ronData);
    console.log(result);
    await chat.send(result);
  }

  // userInput이 !론 [key]인 경우
  else {
    const character_name = userInput.split(" ")[1];
    try { const result = await ronData[character_name]; await chat.send(result); }
    catch (error) { const result = "해당 캐릭터는 등록되어있지 않아요"; await chat.send(result); }
  }
}

async function callTsumo(data, o, chat) {
  const tsumoJson = "chzzk/tsumo-message.json";
  const tsumoData = await readJson(tsumoJson);
  const userInput = data[o].message;

  // userInput이 !쯔모인 경우
  if (userInput === "!쯔모") {
    const result = await pickRandom(tsumoData);
    console.log(result);
    await chat.send(result);
  }

  // userInput이 !쯔모 [key]인 경우
  else {
    const character_name = userInput.split(" ")[1];
    try { const result = await tsumoData[character_name]; await chat.send(result); }
    catch (error) { const result = "해당 캐릭터는 등록되어있지 않아요"; await chat.send(result); }
  }
}

async function readJson(path) {
  const response = await fs.readFile(path, "utf-8");
  const data = JSON.parse(response);
  return data;
}

async function pickRandom(data) {
  // dict에서 value를 랜덤으로 뽑아내는 함수
  const keys = Object.keys(data);
  const randomKey = keys[Math.floor(Math.random() * keys.length)];
  return data[randomKey];
}


async function Sakura(chat) {
  const itemDict = {
    "후지타 카나": 0.147,
    "미카미 치오리": 0.147,
    "아이하라 마이": 0.147,
    "나데시코": 0.147,
    "야기 유이": 0.147,
    "쿠죠 리우": 0.147,
    "지니아": 0.147,
    "카비": 0.147,
    "사라": 0.147,
    "니노미야 하나": 0.147,
    "시라이시 나나": 0.147,
    "타카나시 히나타": 0.147,
    "이가라시 하루나": 0.147,
    "스즈미야 사와코": 0.147,
    "히나 모모": 0.147,
    "카구야 히메": 0.147,
    "후지모토 키라라": 0.147,
    "엘리사": 0.147,
    "테라사키 치호리": 0.147,
    "후지": 0.147,
    "나나미 레이나": 0.147,
    "히메카와 히비키": 0.147,
    "모리카와 아야코": 0.147,
    "오노데라 나나하": 0.147,
    "유즈": 0.147,
    "시노미야 후유미": 0.147,
    "세이란": 0.147,
    "키사라기 아야네": 0.147,
    "미라이": 0.147,
    "란세이": 0.147,
    "한나": 0.147,
    "이브 크리스": 0.147,
    "링랑": 0.147,
    "화료연출: 화염": 0.224,
    "화료연출: 선풍": 0.224,
    "화료연출: 벚꽃": 0.224,
    "화료연출: 흑염": 0.224,
    "화료연출: 불꽃폭풍": 0.224,
    "화료연출: 전자": 0.224,
    "화료연출: 붉은 장미": 0.224,
    "화료연출: K.O.": 0.224,
    "화료연출: 역린": 0.224,
    "화료연출: 고스트": 0.224,
    "화료연출: 블랙홀": 0.224,
    "화료연출: 추수철": 0.224,
    "화료연출: 물의 길": 0.224,
    "리치연출: 청염": 0.224,
    "리치연출: 동결": 0.224,
    "리치연출: 화염": 0.224,
    "리치연출: 잔영": 0.224,
    "리치연출: 깃털": 0.224,
    "리치연출: 도트 코인": 0.224,
    "리치연출: 용": 0.224,
    "리치연출: 박쥐떼": 0.224,
    "리치연출: 고양이의 흔적": 0.224,
    "리치연출: 낫의 양심": 0.224,
    "리치연출: 눈덩이 효과": 0.224,
    "멸치 리치봉": 0.224,
    "대파 리치봉": 0.224,
    "뼈다귀 리치봉": 0.224,
    "크림슨 리치봉": 0.224,
    "24K 순금 리치봉": 0.224,
    "악운 극복 리치봉": 0.224,
    "아이스크림 리치봉": 0.224,
    "소악마 리치봉": 0.224,
    "바게트 리치봉": 0.224,
    "똑똑이 안경 리치봉": 0.224,
    "야구 챔피언 리치봉": 0.224,
    "네온사인 표지판 리치봉": 0.224,
    "작탁: 에메랄드": 0.224,
    "작탁: 라벤더색": 0.224,
    "작탁: 보라색": 0.224,
    "작탁: 수박": 0.224,
    "작탁: 새싹 들판": 0.224,
    "작탁: 달빛 물든 꽃": 0.224,
    "작탁: 숲속의 반딧불": 0.224,
    "작탁: 등나무의 빛": 0.224,
    "작탁: 레드와인": 0.224,
    "작탁: 잿가루": 0.224,
    "마작패: 노란색": 0.224,
    "마작패: 초록색": 0.224,
    "마작패: 붉은색": 0.224,
    "마작패: 유령": 0.224,
    "마작패: 빛나는 진주": 0.224,
    "마작패: 오렌지 먹은 지 오랜지": 0.224,
    "마작패: 표고버섯": 0.224,
    "마작패: 소우주": 0.224,
    "마작패: 회색 구름": 0.224,
    "마작패: 푸른 하늘": 0.224,
    "아기 고양이 손": 0.224,
    "리치 BGM: 진검승부": 0.224,
    "리치 BGM: 격전": 0.224,
    "리치 BGM: 출진": 0.224,
    "리치 BGM: 일촉즉발": 0.224,
    "리치 BGM: 승리의 길": 0.224,
    "리치 BGM: 높은 구름": 0.224,
    "BGM: 비밀 부대": 0.224,
    "BGM: 자유분방": 0.224,
    "BGM: 조화": 0.224,
    "BGM: 미래": 0.224,
    "파란색 선물: 버터 쿠키": 9.375,
    "파란색 선물: 휴대용 게임기": 9.375,
    "파란색 선물: 명작 그림": 9.375,
    "파란색 선물: 고상한 사기잔": 9.375,
    "파란색 선물: 물방울 다이아몬드": 9.375,
    "파란색 선물: 테디베어L": 9.375,
    "파란색 선물: 얇은 책": 9.375,
    "파란색 선물: 세라복": 9.375,
    "보라색 선물: 향기로운 쿠키": 0.625,
    "보라색 선물: 차세대 게임기": 0.625,
    "보라색 선물: 불후의 명화": 0.625,
    "보라색 선물: 고급 와인잔": 0.625,
    "보라색 선물: 하트 오브 디 오션": 0.625,
    "보라색 선물: 테디베어XXL": 0.625,
    "보라색 선물: 인기 만화": 0.625,
    "보라색 선물: 화려한 원피스": 0.625,
  }

  const totalWeight = Object.values(itemDict).reduce((sum, weight) => sum + weight, 0);

  // 무작위 수 생성 (0 이상 totalWeight 미만)
  let random = Math.random() * totalWeight;

  // 확률 가중치에 따라 키 선택
  for (const [item, weight] of Object.entries(itemDict)) {
      random -= weight;
      if (random < 0) {
          console.log(`가챠결과: ${item}`)
          chat.send(`가챠결과: ${item}`);
          return item;
          }
      }
}

async function collabo(chat) {
  // 0.005 * 0.59 * 0.25의 확률로 등장하는 캐릭터를 뽑는데 몇번의 시도가 필요할지 시뮬레이션 (평균 구하는 것이 아님)
  const collaboProbability = 0.005 * 0.59;
  const targetProbability = 0.005 * 0.59 * 0.25;

  let collaboAttempts = 0;
  while (Math.random() > collaboProbability) {
    collaboAttempts++;
  }

  let targetAttempts = 0;
  while (Math.random() > targetProbability) {
    targetAttempts++;
  }

  await chat.send(`콜라보 가챠 시뮬레이션: ${collaboAttempts}회 / ${targetAttempts}회`);
}

async function splitTiles(tile_input) {
  const result = [];
  let currentNumbers = "";

  for (const char of tile_input) {
    if (isNaN(parseInt(char, 10))) { // 현재 문자가 숫자가 아닌 경우
      // 알파벳을 만날 때마다 앞서 처리한 숫자들과 결합하여 결과 배열에 추가
      for (const num of currentNumbers) {
        result.push(`${num}${char}`);
      }
      currentNumbers = ""; // 숫자들을 리셋
    } else {
      // 숫자들은 계속 문자열에 추가
      currentNumbers += char;
    }
  }
  return result;
}

function sumValues(obj) {
    const result = {};
    for (const key in obj) {
      // 각 키에 대해 모든 값을 합산
      result[key] = Object.values(obj[key]).reduce((sum, current) => sum + current, 0);
    }
    return result;
}

function sortObjectByValues(obj) {
    // 객체를 [key, value] 쌍의 배열로 변환
    const entries = Object.entries(obj);
  
    // 값(value)에 따라 내림차순 정렬
    entries.sort((a, b) => b[1] - a[1]);
  
    // 정렬된 배열을 다시 객체로 변환
    const sortedObj = {};
    for (const [key, value] of entries) {
      sortedObj[key] = value;
    }
  
    return sortedObj;
}

function formatTopUkeire(obj, limit) {
    const sortedEntries = Object.entries(obj).sort((a, b) => b[1] - a[1]);
  
    // 상위 'limit' 개의 항목만 선택
    const topEntries = sortedEntries.slice(0, limit);
  
    // 선택된 항목들을 문자열로 변환
    const formattedEntries = topEntries.map(([key, value]) => `${key} : ${value}`);
  
    // 문자열 항목들을 하나의 문자열로 결합
    return formattedEntries.join(" / ");
}

async function fetchTextWithPuppeteer(url, selector, attributeOrProperty) {
  const puppeteer = await import('puppeteer');
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'networkidle2' });

  await page.waitForSelector(selector, { timeout: 5000 });

  // 속성 또는 프로퍼티 접근하기
  const value = await page.$eval(selector, (element, attrOrProp) => {
    // 'attrOrProp'가 HTML 표준 속성인지 먼저 체크
    if (element.hasAttribute(attrOrProp)) {
      return element.getAttribute(attrOrProp);
    } else {
      // HTML 속성이 아니라면 프로퍼티로 접근
      return element[attrOrProp];
    }
  }, attributeOrProperty);

  console.log(value);

  await browser.close();

  return value;
}

function generateMahjongTiles() {
  const tiles = [];

  // 만수(萬子, m), 통수(筒子, p), 삭수(索子, s) 각각 1부터 9까지
  ['m', 'p', 's'].forEach(type => {
      for (let i = 1; i <= 9; i++) {
          for (let j = 0; j < 4; j++) {  // 각 타일을 4번씩 추가
              tiles.push(`${i}${type}`);
          }
      }
  });

  // 자패(字牌, z) 1부터 7까지
  for (let i = 1; i <= 7; i++) {
      for (let j = 0; j < 4; j++) {  // 각 타일을 4번씩 추가
          tiles.push(`${i}z`);
      }
  }

  return tiles;
}

async function accessKoromo(user_name, stat=true) {
  console.log('searching koromo');

  try {
    const base = 'https://5-data.amae-koromo.com/api/v2/pl4/';
    const mode = '16,15,12,11,9,8';

    const response = await axios.get(`${base}search_player/${encodeURIComponent(user_name)}`);
    const pdata = response.data[0]; // 중복여부를 고려하지 않고 첫 번째 결과 사용
    const pid = pdata['id'];
    const start = pdata['latest_timestamp'];

    const statsUrl = `${base}player_stats/${pid}/1262304000000/${start}999?mode=${mode}&tag=`;
    const statsJsonResponse = await axios.get(statsUrl);
    const statsJson = statsJsonResponse.data;

    const extendedStatsUrl = `${base}player_extended_stats/${pid}/1262304000000/${start}999?mode=${mode}&tag=`
    const extendedStatsResponse = await axios.get(extendedStatsUrl);
    const extendedStatsJson = extendedStatsResponse.data;

    const playerRecords = `${base}player_records/${pid}/${start}999/1262304000000?limit=10&mode=${mode}&descending=true&tag=`;
    const playerRecordsResponse = await axios.get(playerRecords);
    const playerRecordsJson = playerRecordsResponse.data;

    const dump = {...statsJson, ...extendedStatsJson};

    console.log(dump);

    if (stat) {
      const riichiRate = formatRate(dump.立直率 * 100);
      const damaRate = formatRate(dump.默听率 * 100);
      const callRate = formatRate(dump.副露率 * 100);

      const winRate = formatRate(dump.和牌率 * 100);
      const dealInRate = formatRate(dump.放铳率 * 100);

      result = `리치율: ${riichiRate}%, 다마율: ${damaRate}%, 후로율: ${callRate}%, 화료율: ${winRate}%, 방총률: ${dealInRate}%`;
    }

    else {
      const currentTier = dump.level?.id;
      const lvScore = dump.level?.score;
      const lvDelta = dump.level?.delta;
      const avgRank = formatRate(dump.avg_rank);

      const currentLv = lvScore + lvDelta;
      
      if (currentTier.toString().substring(0, 3) === '101') {
        tier = '초심';
      } else if (currentTier.toString().substring(0, 3) === '102') {
        tier = '작사';
      } else if (currentTier.toString().substring(0, 3) === '103') {
        tier = '작걸';
      } else if (currentTier.toString().substring(0, 3) === '104') {
        tier = '작호';
      } else if (currentTier.toString().substring(0, 3) === '105') {
        tier = '작성';
      } else if (currentTier.toString().substring(0, 3) === '106') {
        tier = '혼천';
      } else if (currentTier.toString().substring(0, 3) === '107') {
        tier = '혼천';
      }

      const tierRank = currentTier.toString().substring(4);
      const tierName = `${tier} ${tierRank}`;

      if (tierName === '초심 1') { maxLv = 20; }
      else if (tierName === '초심 2') { maxLv = 80; }
      else if (tierName === '초심 3') { maxLv = 200; }
      else if (tierName === '작사 1') { maxLv = 600; }
      else if (tierName === '작사 2') { maxLv = 800; }
      else if (tierName === '작사 3') { maxLv = 1000; }
      else if (tierName === '작걸 1') { maxLv = 1200; }
      else if (tierName === '작걸 2') { maxLv = 1400; }
      else if (tierName === '작걸 3') { maxLv = 2000; }
      else if (tierName === '작호 1') { maxLv = 2800; }
      else if (tierName === '작호 2') { maxLv = 3200; }
      else if (tierName === '작호 3') { maxLv = 3600; }
      else if (tierName === '작성 1') { maxLv = 4000; }
      else if (tierName === '작성 2') { maxLv = 6000; }
      else if (tierName === '작성 3') { maxLv = 9000; }
      else if (tierName === '혼천') { maxLv = 0; }

      result = `단위: ${tierName} (${currentLv}/${maxLv}), 평균순위: ${avgRank}`;
      console.log(result)
    }

  } catch (error) {
    result = "코로모 검색 중 오류가 발생했습니다";
  }

  return result;
}

function formatRate(value) {
  // isNaN() 함수로 수치가 유효한지 확인
  return isNaN(value) ? "N/A" : value.toFixed(2);
}

module.exports = { registerPaipu, calculateEfficiency, calculateUma, searchNodocchi, searchKoromo, searchStat, tsumo, dice, drawHand, todayYaku, checkNagashi, checkIppatsu, callRon, Sakura, collabo, callTsumo };
