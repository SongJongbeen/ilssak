const buzzk = require("buzzk");
const fs = require('fs').promises;
const { registerPaipu, calculateEfficiency, calculateUma, searchNodocchi, searchKoromo, searchStat, tsumo, dice, drawHand, todayYaku, checkNagashi, checkIppatsu, callRon, Sakura, collabo, callTsumo } = require("./functions");

require("dotenv").config({ path: "chzzk/.env" })

buzzk.login(process.env.NID_AUT, process.env.NID_SES); //로그인

const buzzkChat = buzzk.chat;

async function test () {

    const termData = await fs.readFile('chzzk/terminology.json', 'utf-8');
    const terminology = JSON.parse(termData); // JSON 파싱

    let chSearch = await buzzk.channel.search("금성경"); //채널 검색
    
    let channel = chSearch[0]; //검색 결과 첫번째 채널

    const lvDetail = await buzzk.live.getDetail(channel.channelID); //현재 방송 정보

    let chat = new buzzkChat(channel.channelID);
    await chat.connect(); //채팅창 연결

    let recentChat = await chat.getRecentChat(); //최근 채팅 가져오기 (기본값 50개)
    console.log(recentChat);

    chat.onMessage(async (data) => { //채팅이 왔을 때
        for (let o in data) {
            console.log(data[o].message);
            
			if (data[o].message.startsWith("!패보")) {registerPaipu(data, o, chat);} // 패보 등록
            
            if (data[o].message.startsWith("!패효율")) {calculateEfficiency(data, o, chat);} // 패효율 계산

            if (data[o].message.startsWith("!환산점수")) {calculateUma(data, o, chat);} // 환산점수 계산

            if (data[o].message.startsWith("!노돗치")) {searchNodocchi(data, o, chat);} // 노돗치 검색

            if (data[o].message.startsWith("!코로모")) {searchKoromo(data, o, chat);} // 코로모 검색

            if (data[o].message.startsWith("!스탯")) {searchStat(data, o, chat);} // 코로모 스탯 검색

            if (data[o].message === "!대탁멤버") await chat.send("대탁 중이 아니에요");

            if (data[o].message === "!draw") await chat.send(await tsumo());

            if (data[o].message.startsWith("!쯔모")) await callTsumo(data, o, chat); 

            if (data[o].message === "!주사위") await dice(chat);

            if (data[o].message === "!배패") await drawHand(chat);

            if (data[o].message === "!오늘의역") await todayYaku(chat);

            if (data[o].message === "!나가시") await checkNagashi(chat);

            if (data[o].message === "!일발") await checkIppatsu(chat);

            if (data[o].message.startsWith("!론")) await callRon(data, o, chat);

            if (data[o].message === "!벚꽃의길") await Sakura(chat);

            if (data[o].message === "!죽림의길") await chat.send("햄수는 남캐 안 뽑아");

            if (data[o].message === "!리치 지도희") await chat.send("벼엉신을 만들어주마");

            if (data[o].message === "!콜라보") await collabo(chat);

            if (data[o].message.startsWith("?")) {
                let inputTerm = data[o].message.slice(1);
                if (inputTerm in terminology) {
                    await chat.send(terminology[inputTerm]);
                }
            }

			let userInfo = await chat.getUserInfo(data[o].author.id);
        	console.log(userInfo); //채팅 보낸 유저의 정보
        }
    });
}

test();
