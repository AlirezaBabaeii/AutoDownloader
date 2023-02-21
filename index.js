const puppeteer = require("puppeteer");
const https = require("https");
const fs = require("fs");

const DownloadFileWhitSession = async (UrlList) => {
  if (UrlList) {
    const browser = await puppeteer.launch({ headless: false });

    const page = await browser.newPage();
    await page.goto("https://vip.mrcode.ir/buy");
    await page.setViewport({ width: 1080, height: 1024 });

    await page.type("#sign-in__email", "hello");
    await page.type("#sign-in__password", "hello");

    await page.click(".btn-primary");

    ArrayUrlList.forEach((url, index) => {
      https.get(url, (res) => {
        const stream = fs.createWriteStream(`download-${index}.png`);
        res.pipe(stream);
        stream.on("finish", () => {
          console.log(`finished download ${index}`);
          stream.close();
        });
      });
    });
  }
};

