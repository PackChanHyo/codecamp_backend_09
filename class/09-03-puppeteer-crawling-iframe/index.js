import Puppeteer from "puppeteer";
import mongoose from "mongoose";
import { Stock } from "../09-04-puppeteer-crawling-with-api/crawler/models/stock.model";

async function startCrawling() {
  const browser = await Puppeteer.launch({ headless: false }); // ture가 되면 UI가 안보임(눈에 보이지 않음)
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 720 });
  await page.goto("https://finance.naver.com/item/sise.naver?code=005930"); // goto는 주소를 치고 엔터 쳤다는 가정
  await page.waitForTimeout(1000);
  const framePage = await page
    .frames()
    .find((el) => el.url().includes("/item/sise_day.naver?code=005930"));

  for (let i = 3; i <= 7; i++) {
    const date = await framePage.$eval(
      `body > table.type2 > tbody > tr:nth-child(${i}) > td:nth-child(1) > span`,
      (el) => el.textContent
    );

    const price = await framePage.$eval(
      `body > table.type2 > tbody > tr:nth-child(${i}) > td:nth-child(2) > span`,
      (el) => el.textContent
    );

    console.log(`날짜: ${date}, 가격: ${price}`);
  }
  await browser.close();
}

startCrawling();
