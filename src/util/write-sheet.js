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


async function writeSheet(sheetName, startCell, endCell, values, spreadsheetId) {
  const valueInputOption = 'USER_ENTERED';  // 'RAW' 또는 'USER_ENTERED'

  try {
    const response = await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `${sheetName}!${startCell}:${endCell}`,
      valueInputOption,
      resource: {
        values: values
      }
    });

    console.log(`Data updated successfully in range ${range} on ${sheetName}`);
  } catch (err) {
    console.error('The API returned an error: ' + err);
  }
}

module.exports = writeSheet;
