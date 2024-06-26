const { google } = require('googleapis');
const keys = require('../../celestial-league-key.json');
require("dotenv").config({ path: ".env" })

const client = new google.auth.JWT(
  keys.client_email,
  null,
  keys.private_key,
  ['https://www.googleapis.com/auth/spreadsheets']
);

const sheets = google.sheets({ version: 'v4', auth: client });

async function readSheet(sheetName, startCell, endCell, spreadsheetId) {
  const range = `${sheetName}!${startCell}:${endCell}`;  // 읽어올 범위 설정

  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });

    const rows = response.data.values;
    if (rows.length) {
      console.log('Data read from the spreadsheet:');
      rows.map((row) => console.log(row));
      return rows;
    } else {
      console.log('No data found.');
    }
  } catch (err) {
    console.error('The API returned an error: ' + err);
  }
}

module.exports = readSheet;
