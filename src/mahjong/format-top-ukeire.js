function formatTopUkeire(obj, limit) {
    const sortedEntries = Object.entries(obj).sort((a, b) => b[1] - a[1]);
  
    // 상위 'limit' 개의 항목만 선택
    const topEntries = sortedEntries.slice(0, limit);
  
    // 선택된 항목들을 문자열로 변환
    const formattedEntries = topEntries.map(([key, value]) => `${key} : ${value}`);
  
    // 문자열 항목들을 하나의 문자열로 결합
    return formattedEntries.join(" / ");
}

module.exports = formatTopUkeire;