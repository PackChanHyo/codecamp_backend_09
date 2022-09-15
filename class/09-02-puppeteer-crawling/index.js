// 여기어때/야놀자 크롤링 위법 사례 : https://biz.chosun.com/topics/law_firm/2021/09/29/OOBWHWT5ZBF7DESIRKNPYIODLA/
// 사람인/잡코리아 크롤링 위법 사례 : https://brunch.co.kr/@lawmission/113

import Puppeteer from "puppeteer";

async function startCrawling() {
  const browser = await Puppeteer.launch({ headless: false }); // ture가 되면 UI가 안보임(눈에 보이지 않음)
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 720 });
  await page.goto("https://www.goodchoice.kr/product/search/2"); // goto는 주소를 치고 엔터 쳤다는 가정
  await page.waitForTimeout(1000);

  const stage = await page.$eval(
    // 두개 이상일 경우 $$eval로 쓴다.
    "#poduct_list_area > li:nth-child(2) > a > div > div.name > div > span",
    (el) => el.textContent
  );

  const location = await page.$eval(
    "#poduct_list_area > li:nth-child(2) > a > div > div.name > p:nth-child(4)",
    (el) => el.textContent
  );

  const price = await page.$eval(
    "#poduct_list_area > li:nth-child(2) > a > div > div.price > p > b",
    (el) => el.textContent
  );
  console.log(stage);
  console.log(location.trim());
  console.log(price);

  await browser.close();
}

startCrawling();
