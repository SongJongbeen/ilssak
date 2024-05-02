const fs = require('fs/promises');

async function registerWeeklySchedule(data, o, chat, streamerName) {
    console.log("registering weekly schedule");

    if (streamerName !== "해모수보컬") { await chat.send("현재 해당 기능은 해모수보컬만 사용 가능합니다"); return; }

    const message = data[o].message;
    const parsed_message = message.split(" ");
    const date = parsed_message[1];
    const schedule = parsed_message.slice(2).join(" ");

    if (schedule === "") { await chat.send("일정을 입력해주세요"); return; }

    const weeklyScheduleJson = "./data/schedule.json"
    const weeklyScheduleData = await fs.readFile(weeklyScheduleJson, { encoding: 'utf8' });
    let weeklySchedule = JSON.parse(weeklyScheduleData);

    weeklySchedule[date] = schedule;

    const updatedWeeklySchedule = JSON.stringify(weeklySchedule, null, 2);

    await fs.writeFile(weeklyScheduleJson, updatedWeeklySchedule, { encoding: 'utf8' });
    console.log(weeklySchedule)

    await chat.send("일정이 등록되었습니다");
}

module.exports = registerWeeklySchedule;
