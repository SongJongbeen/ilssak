async function splitTiles(tile_input) {
    const result = [];
    let currentNumbers = "";
  
    for (const char of tile_input) {
      if (isNaN(parseInt(char, 10))) { // 현재 문자가 숫자가 아닌 경우
        // 알파벳을 만날 때마다 앞서 처리한 숫자들과 결합하여 결과 배열에 추가
        for (const num of currentNumbers) {
          result.push(`${num}${char}`);
        }
        currentNumbers = ""; // 숫자들을 리셋
      } else {
        // 숫자들은 계속 문자열에 추가
        currentNumbers += char;
      }
    }
    return result;
}

module.exports = splitTiles;