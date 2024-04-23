async function registerQuestion(data, o, chat) {
    console.log("registering question");

    let message = data[o].message;
    let parsed_message = message.split(" ");
    
    // parsed_message에서 [0]은 !질문, [1]부터는 질문 내용
    let inputQuestion = parsed_message.slice(1).join(" ");
    const question = encodeURIComponent(inputQuestion);
    
    //question = parsed_message[1];   // [1]이 아니라 그 이후의 모든 요소를 합쳐서 question으로 만들어야 함

    let inputUserName = data[o]["author"]["name"];
    const userName = encodeURIComponent(inputUserName);

    const dateStr = new Date().toLocaleString("en-US", {timeZone: "Asia/Seoul"});
    const [datePart] = dateStr.split(", ");
    const [month, day, year] = datePart.split("/");

    const formattedMonth = month.padStart(2, "0");
    const formattedDay = day.padStart(2, "0");

    const formattedDate = `${year}${formattedMonth}${formattedDay}`;
    
    let url = `https://script.google.com/macros/s/AKfycbwEzIU-7-S97o3ZxLixjwywiwV6RHxzgTtKH6TSFSS-/dev?User=${userName}&Date=${formattedDate}&Question=${question}`;
    console.log(url);

    try {
        const fetch = (await import('node-fetch')).default;
        const response = await fetch(url);

        timeout = setTimeout(() => {}, 500);

        const text = await response.text();
        await chat.send(text);
    } catch (error) {
        console.error("Error fetching URL: ", error);
        await chat.send("질문 등록 중 오류가 발생했습니다");
    }
}

module.exports = registerQuestion;
