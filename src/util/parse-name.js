function parseUserName(message) {
    const parsedMessage = message.split(" ");
    if (parsedMessage.length < 2) {
        throw new Error("유효하지 않은 메시지 형식입니다. 사용자 이름이 포함되어야 합니다.");
    }
    return parsedMessage[1];
}

module.exports = parseUserName;