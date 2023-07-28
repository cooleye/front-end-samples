const puppeteer = require("puppeteer");


const url = 'http://jandan.net/';

const getScreenShot = async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(url);
  await page.screenshot({ path: "baidu.png" });

  await browser.close();
};

getScreenShot();