const fs = require('fs');

async function checkAuthority(data, o, chat, streamerName) {
    let message = data[o].message;

    let authority = fs.readFileSync('data/authority.json');
    authority = JSON.parse(authority);

    const streamerAuthority = authority[streamerName];
    if (streamerAuthority.includes(data[o].author.name)) { return true; } 
    else { return false; }
}

module.exports = checkAuthority;