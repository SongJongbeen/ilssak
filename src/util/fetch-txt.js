async function fetchTextWithPuppeteer(url, selector, attributeOrProperty) {
    const puppeteer = await import('puppeteer');
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2' });
  
    await page.waitForSelector(selector, { timeout: 5000 });
  
    // 속성 또는 프로퍼티 접근하기
    const value = await page.$eval(selector, (element, attrOrProp) => {
      // 'attrOrProp'가 HTML 표준 속성인지 먼저 체크
      if (element.hasAttribute(attrOrProp)) {
        return element.getAttribute(attrOrProp);
      } else {
        // HTML 속성이 아니라면 프로퍼티로 접근
        return element[attrOrProp];
      }
    }, attributeOrProperty);
  
    console.log(value);
  
    await browser.close();
  
    return value;
}

module.exports = fetchTextWithPuppeteer;