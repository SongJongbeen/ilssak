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

module.exports = registerPaipu;