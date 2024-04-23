const fs = require("fs").promises;

async function readJson(path) {
    const response = await fs.readFile(path, "utf-8");
    const data = JSON.parse(response);
    return data;
}

module.exports = readJson;
