import Puppeteer from "puppeteer";
import mongoose from "mongoose";
import { Starbuck } from "./models/starbucksSchema.js";

// 몽고DB 접속 !!
mongoose.connect("mongodb://localhost:27017/Mini-Project");

async function starBucks() {
  const browser = await Puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 720 });
  await page.goto("https://www.starbucks.co.kr/menu/drink_list.do");
  //   await page.waitForTimeout(1000);

  for (let i = 1; i <= 30; i++) {
    const name = await page.$eval(
      `#container > div.content > div.product_result_wrap.product_result_wrap01 > div > dl > dd:nth-child(2) > div.product_list > dl > dd:nth-child(6) > ul > li:nth-child(${i}) > dl > dd`,
      (el) => el.textContent
    );
    const images = await page.$eval(
      `#container > div.content > div.product_result_wrap.product_result_wrap01 > div > dl > dd:nth-child(2) > div.product_list > dl > dd:nth-child(6) > ul > li:nth-child(${i}) > dl > dt > a > img`,
      (el) => el.src
    );

    const starbuckDb = new Starbuck({
      name: name,
      img: images,
    });

    starbuckDb.save();
  }
  await browser.close();
}

starBucks();
