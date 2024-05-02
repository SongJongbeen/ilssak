const readSheet = require('./read-sheet');
const writeSheet = require('./write-sheet');

async function addPoint(userName, point) {
    console.log("adding point");

    // check if there is a userName in the sheet
    const sheetName = "포인트";
    const startCell = "B3";
    const endCell = "G500";

    let pointData = await readSheet(sheetName, startCell, endCell);

    let userPointData = pointData.find(row => row[1] === userName);

    if (userPointData) {
        let currentPoint = userPointData[2];
        currentPoint = parseInt(currentPoint);
        point = parseInt(point);
        let newPoint = currentPoint + point;

        userPointData[2] = newPoint.toString();
        userPointData[5] = "+" + point;

        await writeSheet(sheetName, startCell, endCell, pointData);
    }

    else {
        let lastRow = pointData.length;
        lastRow = lastRow.toString();
        point = 1000;

        let newPointData = [lastRow, userName, point, "", "", 0];
        pointData.push(newPointData);

        await writeSheet(sheetName, startCell, endCell, pointData);
    }

    console.log(`${userName}: ${pointData}`);
    return point;
}

module.exports = addPoint;