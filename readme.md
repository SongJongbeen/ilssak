# 일싹이
일싹이는 치지직에서 마작을 플레이하는 스트리머들을 위한 챗봇입니다 <br/>
대부분의 기능과 설정은 일본의 "리치마작" 규칙 기반이고, 작혼/천봉의 등급전 4인 반장전을 기준으로 하고 있습니다 <br/>
더 많은 기능들이 추가될 예정이에요! <br/>

일싹이는 처음에 [해모수보컬](https://chzzk.naver.com/10802ee502520954920814bfca6794be) 방송을 위해 만들어졌어요 <br/>
따라서 기본 설정된 값이 본인과 맞지 않는다면 따로 말씀해주셔야해요! <br/>
문의는 
<code><a href="https://discord.gg/wnkQ7UNDre">해모수보컬 디스코드</a> > <a href="https://discord.com/channels/981755445884645416/1230148075213819964">프로젝트</a> > <a href="https://discord.com/channels/981755445884645416/1230148145757949973">일싹이</a></code>
에서 부탁드립니다! <br/>

또한 원활한 방송을 위해, 등록된 사용자가 !on과 !off 명령어로 봇을 활성화/비활성화할 수 있도록 하였습니다! <br/>
사용자 등록을 위해서는 개발자에게 치지직 닉네임을 알려주세요 (방송인 or 매니저만 해드립니다) <br/>

## 목차
> 느낌표 (!)로 시작하는 명령어는 특정한 기능을 수행합니다 <br/>
> 물음표 (?)로 시작하는 명령어는 특정한 답변을 반환해요

- **[1. 느낌표 명령어](#1-느낌표-명령어)**
    - [!패보](#패보) <br/>
    - [!패효율](#패효율) <br/>
    - [!점수](#점수-추가예정) <br/>
    - [!조건(추가예정)](#조건-추가예정) <br/>
    - [!환산점수](#환산점수) <br/>
    - [!노돗치](#노돗치) <br/>
    - [!코로모](#코로모) <br/>
    - [!스탯](#스탯) <br/>
    - [!누구](#누구) <br/>
    - [!채점(추가예정)](#채점) <br/>
    - [!draw](#draw) <br/>
    - [!주사위](#주사위) <br/>
    - [!배패](#배패) <br/>
    - [!오늘의역](#오늘의역) <br/>
    - [!나가시 or !일발](#나가시-or-일발) <br/>
    - [!쯔모 or !론](#쯔모-or-론) <br/>
    - [!벚꽃의길 or !죽림의길](#벚꽃의길-or-죽림의길) <br/>
    - [!콜라보](#콜라보) <br/>
    - [!커스텀 명령어](#커스텀-명령어) <br/>
    - [!질문](#질문) <br/>
    - [!스케줄](#스케줄) <br/>
    - [!일정](#일정) <br/>

- **[2. 물음표 명령어](#2-물음표-명령어)**
    - [?용어](#용어) <br/>
    - [?숫자](#숫자) <br/>
    - [?유용한 링크들](#유용한-링크들) <br/>

- **[3. 혼천리그 전용 명령어](#3-혼천리그-전용-명령어)**
    - [!질문](#질문) <br/>
    - [!기록](#기록) <br/>
    - [!이번주](#이번주) <br/>
    - [!순위](#순위) <br/>
    - [!결과](#결과) <br/>
    - [!상금](#상금) <br/>


## 1. 느낌표 명령어

### !패보
> !패보 [패보코드] <br/>
> (ex) !패보 240412-09ffa809-2dc1-4c87-a1b4-a5d3ba0fd1c4_a911511926

1. 채팅을 통해 패보를 등록할 수 있어요
2. 하루에 패보 하나만 등록 가능해요 (해모수 보컬 기준, 타 스트리머는 해당 없음)
3. 올라간 패보는 스트리머가 열람/수정 가능한 스프레드시트에서 확인할 수 있어요


### !패효율
> !패효율 [손패] <br/>
> (ex) !패효율 19p19s19m12345678z5s

1. 입력한 손패의 패효율과 샹텐수를 계산해줘요
2. 국사/치또이 등의 역도 고려해요
3. 패가 14매가 되지 않으면 소패/다패 여부를 출력해요
4. 패의 **효율**을 위한 기능이기 때문에 아카, 버림패, 도라패 등을 고려하지 않아요


### !점수
> !점수 [선/자] [판수] [부수] <br/>
> (ex) !점수 선 2 30

1. 입력한 판수와 부수에 해당하는 점수를 출력해줘요
2. (쯔모) n점 / (론) n'점 과 같이 출력돼요


### !조건 (작업중)
> !조건 [선/자] [점수] [~공탁금] [~본장] <br/>
> (ex) !조건 친 3300 or !조건 자 8800 <br/>
> (ex) !조건 친 3300 1000 1

1. 입력한 조건에 따라 필요한 최소 판/부를 알려줘요 (부수는 자주 등장하는 20 ~ 60부까지만 계산해요)
2. 공탁금과 본장은 생략해도 괜찮아요 (없다면 공탁금 0점, 0본장 기준으로 계산해요)
3. 타가 론은 `(조건점수)`만큼 + 직격은 `(조건점수 / 2)`만큼 화료하면 되니 따로 답변하지 않아요
4. '자' 조건이라면 상대가 오야일때 (카부리일때)와 그렇지 않을때 따로 계산해드려요


### !환산점수
> !환산점수 [점수] [순위] <br/>
> (ex) !환산점수 39000 1

1. 순위와 점수를 토대로 작혼 등급전의 점수변동을 알려줘요
2. 현재 작호3 옥탁 기준으로 계산해요


### !노돗치
> !노돗치 [천봉 닉네임] <br/>
> (ex) !노돗치 Plague

1. 노돗치에서 해당 유저를 검색해요
2. 안정성을 위해 답변이 느려요!
3. 짧은 시간동안 너무 많은 요청을 하면 좋지 않아요
4. 현재단위, 안정단위, 평균순위를 알려드려요
5. 한국어/영어/일본어는 지원하나, 일부 특수문자의 경우 검색이 안될 수도 있어요


### !코로모
> !코로모 [작혼 닉네임] <br/>
> (ex) !코로모 해모수보컬

1. 코로모에서 해당 유저를 검색해요
2. 노돗치보다는 빠르지만, 안정성을 위해 답변이 느려요!
3. 짧은 시간동안 너무 많은 요청을 하면 좋지 않아요
4. 현재단위 ( 레벨 / max레벨 ), 평균순위를 알려드려요

### !스탯
> !스탯 [작혼 닉네임] <br/>
> (ex) !스탯 해모수보컬

1. 코로모에서 해당 유저를 검색해요
2. 안정성을 위해 답변이 느려요!
3. 짧은 시간동안 너무 많은 요청을 하면 좋지 않아요
4. 리치율, 다마율, 후로율, 화료율, 방총률을 알려드려요
5. 모든 탁의 플레이 기록을 바탕으로 해요

### !누구
> !누구 [작혼 닉네임] <br/>
> (ex) !스탯 해모수보컬

1. 코로모에서 해당 유저를 검색해요
2. 안정성을 위해 답변이 느려요!
3. 짧은 시간동안 너무 많은 요청을 하면 좋지 않아요
4. 작사의 성향을 알려드려요
5. 모든 탁의 플레이 기록을 바탕으로 해요
6. 각 성향의 기준이에요

    | 성향 분류 | 기준 ( >= ) |
    | :-------: | :---------------: |
    | 리치/다마 | 리치율 19.01 |
    | 공격/수비 | 화료율 20.83 |
    | 후로/멘젠 | 후로율 32.30 |
    | 지공/속공 | 후로순 12.21 |
    | 고대/연대 | 평균순위 2.5 |
    | 양학/현지 | 화방률 12.00 |


### !채점
> !채점 [패보링크] <br/>
> (ex) !채점 240412-09ffa809-2dc1-4c87-a1b4-a5d3ba0fd1c4_a911511926

1. Mortal 기준으로 rating과 일치율을 알려드려요
2. 현재 직접 mortal 학습 중이에요. 시간과 비용이 조금 걸려서 금방 추가되지는 않을거에요


### !draw
> !draw

1. 랜덤으로 마작패 하나를 쯔모해줘요


### !주사위
> !주사위

1. 오프용 주사위를 굴려줘요 (2개)
2. 화살표는 굴린 사람 기준 방향이에요!


### !배패
> !배패

1. 배패를 생성해줘요
2. 생성된 배패가 화료상태 (천화!)일 경우 이스터에그가 있어요


### !오늘의역
> !오늘의역

1. 랜덤으로 역 한 종류를 알려줘요
2. 역의 등장 확률은 코나미의 마작 파이트 클럽에서 2003년까지 집계한 역 발생횟수 집계표를 따라요


### !나가시 or !일발
> !나가시 <br/>
> !일발

1. 확률에 따라 랜덤으로 성공여부를 알려줘요
2. 상황과 조건을 고려하지 않으니 재미로만 봐야해요!

### !쯔모 or !론
> ![론/쯔모] [~캐릭터명] <br/>
> (ex) !쯔모 or !쯔모 이치히메 <br/>
> (ex) !론 or !론 이치히메

1. 작혼 캐릭터의 쯔모, 론 대사를 출력해요
2. 대사가 단순 '론' or '쯔모'인 캐릭터는 없어요
3. 뒤에 캐릭터 이름을 안 넣으면 랜덤 캐릭터의 대사를 출력해요

### !벚꽃의길 or !죽림의길
> !벚꽃의길 <br/>
> !죽림의길

1. 작혼 단챠를 시뮬레이션 해줘요
2. 작혼의 '기원' 시스템의 실제 확률 기반이에요
3. 10연차는 채팅이 너무 길어져 추가할 계획이 없어요
4. 방송인의 요청에 의해 "죠셉" 캐릭터는 "(익명의 남자캐릭터)"로 대체되어 출력돼요

### !콜라보
> !콜라보

1. 작혼의 콜라보 기원을 시뮬레이션 해줘요
2. 콜라보 캐릭터 아무나, 원하는 콜라보 캐릭터 (1개)를 뽑는데 걸리는 가챠횟수를 각각 알려줘요
3. 평균값이 아니라 그때 그때 확률 기반으로 시뮬레이션한 결과에요
4. 특성상 편차가 커요!
5. 천장은 고려하고, 10연차에서 보라색 선물 확정 등장은 반영하지 않아요

### !커스텀 명령어
> (ex) !대탁멤버

1. 스트리머가 커스텀 명령어를 추가할 수 있도록 하는 것은 기능상 어렵진 않아요
2. 다만 아직까지는 보안 등의 이유로 이것을 가능하게 할지 결정하지 못했어요
3. 혹시 추가하고 싶은 명령어가 있다면 개별적으로 요청하시면 추가해드리는 방향으로 당분간 갈게요
4. 현재 추가된 커스텀 명령어는 [여기](https://github.com/SongJongbeen/ilssak/blob/main/data/commands.json)에서 확인할 수 있어요

### !질문
> (ex) !질문 동2국 14순에 왜 아카5만 버리나요?

1. 스트리머가 열람/수정할 수 있는 스프레드시트에 질문이 등록돼요
2. 질문 시점이 언제였는지 같이 질문에 넣어줘야 스트리머가 답변하기 편해요

### !스케줄
> (ex) !스케줄 5월 5일에 친선 내전 한판 어떠신가요?

1. 스트리머에게 스케줄을 부탁할 수 있어요
2. 부탁한 스케줄은 스트리머가 열람/수정할 수 있는 스프레드시트에 등록돼요
3. 등록되었다고해서 꼭 스트리머가 하는건 아니에요!

### !일정
> (ex) !일정 월 천봉
> (ex) !월

1. !일정을 통해 특정 요일/날짜에 뭐할지 등록할 수 있어요
2. 등록된 일정은 !(지정한 요일/날짜)로 확인할 수 있어요
3. 현재는 해모수보컬 님 전용으로 개발되어있어요
4. 만약 사용을 원하신다면 개발자에게 연락해주세요!

## 물음표 명령어

### ?용어
> ?[용어] <br/>
> (ex) ?샤보

1. 2024.04.24. 기준 총 732개의 마작 관련 용어가 정리되어있어요
2. 용어는 [여기](https://github.com/SongJongbeen/ilssak/blob/main/data/terminology.json)에서 확인할 수 있어요
3. 실시간 업데이트는 아니지만, [여기](https://docs.google.com/spreadsheets/d/1rycG8SBz3TIzVHQF0cbQfhEbvGfBHsQkHJhLV1VSEos/edit?usp=sharing)에서 스프레드시트 형식으로 열람할 수도 있어요
4. 스프레드시트에서 comment 기능을 통해 용어추가나 뜻 변경 등을 요청하실 수 있어요
5. 혹은 [여기](https://discord.com/channels/981755445884645416/1230148145757949973)에서 개발자에게 직접 말씀하셔도 됩니다
6. 용어 추가 원칙은 '최대한 넓게' 입니다. M리그, 전략서 등 어떤 매체에 나온 용어라도 커버할 수 있도록 `이런것도 알아야해?` 하는 용어까지 추가하고 있습니다.


### ?숫자
> ?[숫자] <br/>
> (ex) ?3

1. 일본어로 해당 숫자를 어떻게 읽는지 알려줘요
2. 1~9까지 있어요


### ?유용한 링크들
> ?[찾고싶은곳] <br/>
> (ex) ?m리그 <br/>
> (ex) ?모탈

1. 마작 관련 유용한 링크들을 정리해뒀어요
2. 등재된 링크 목록은 [여기](https://github.com/SongJongbeen/ilssak/blob/main/data/urls.json)에서 확인할 수 있어요
3. 특정 스트리머 관련 링크는 당분간은 추가할 예정없습니다
4. 대회 관련 링크는 적극적으로 추가 예정이오니, 많은 제보 부탁드립니다 ([제보](https://discord.com/channels/981755445884645416/1230148145757949973))


## 3. 혼천리그 전용 명령어
> 해당 명령어는 일싹이가 [일급천재](https://chzzk.naver.com/b8119eaadca58a5cd0c8cf2d48af8bea)님의 스트리밍 방송에 입장하였을때만 사용가능해요

혼천리그 전용 일싹이에 대한 정보는 [여기](https://github.com/SongJongbeen/ilssak/blob/main/%EC%9D%BC%EC%8B%B9%EC%9D%B4%20%EC%86%8C%EA%B0%9C.pdf)서 찾아볼 수 있어요