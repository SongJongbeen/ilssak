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

module.exports = calculateUma;