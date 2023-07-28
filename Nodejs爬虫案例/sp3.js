// 引入puppeteer 浏览器
const puppeteer = require('puppeteer');
const $ = require("jquery");
const fs = require('fs');

const url = 'http://jandan.net/';

// 自执行函数
(async () => {
    const browser = await puppeteer.launch({ headless: false }); // 打开浏览器
    const page = await browser.newPage(); // 打开新tab页
    
     // 跳转到煎蛋网站
    await page.goto(url,{
        timeout:0,  //跳转等待时间，单位是毫秒, 默认是30秒, 传 0 表示无限等待。
        waitUntil:"domcontentloaded"  //满足什么条件认为页面跳转完成，默认是 load 事件触发时。
    });
    
    console.log('跳转到:',url);

    await autoScroll(page); // 向下滚动加载图片

    const data = await page.evaluate(() => {
    
        let srcs = []
        // 获取图片地址
        $(".list-post .thumbs a img").each( (i,item)=>{
            srcs.push($(item).attr("src"))
        })

        // 获取标题数组
        let texts = []
        $(".list-post .indexs h2 a").each( (i,item)=>{
            texts.push($(item).text())
        })

        return {
            srcs:   srcs,
            title: texts
        }
        
    }); 
    // 获取所有img的src
    console.log(`get ${data}`);

    let json = data.srcs.map( (src,index)=>{
        return {src,text:data.title[index]}
    })

    // 写入到json中
    fs.writeFileSync(__dirname+"/data.json",JSON.stringify({json}))
    // 关闭浏览器
    await browser.close();

})();

  
// 滚动浏览器
  const autoScroll = async page => {
    console.log("scrolling this page to the footer...");
    await page.evaluate(async () => {
      await new Promise((resolve, reject) => {
        let totalHeight = 0;
        let distance = 100;
        let timer = setInterval(() => {
          let scrollHeight = document.body.scrollHeight;
          window.scrollBy(0, distance);
          totalHeight += distance;
  
          if (totalHeight >= scrollHeight) {
            clearInterval(timer);
            resolve();
          }
        }, 200);
      });
    });
  };