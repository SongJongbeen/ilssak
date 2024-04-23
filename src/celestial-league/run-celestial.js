const registerQuestion = require('./register-question.js');

async function runCelestial(data, o, chat) {
    message = data[o].message;

    if (message.startsWith("!질문")) { await registerQuestion(data, o, chat); }

    else { return; }
}

module.exports = runCelestial;
