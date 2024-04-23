async function generatePaipuLink(code) {
    const url = `https://game.mahjongsoul.com/?paipu=${code}`;
    return url;
}

module.exports = generatePaipuLink;