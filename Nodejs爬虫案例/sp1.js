// nodejs 版的jQuery
const cheerio = require('cheerio');   
const axios = require('axios');
const fs = require('fs');

// 访问目标网站
axios.get('http://jandan.net/')
.then((result) => {
    const $ = cheerio.load(result.data); 
    parse($)
}).catch((err) => {
    console.log(err) 
});

// 解析网站内容
function parse($){
    let str = [];
    $(".list-post").each((i,item)=>{
       let src =  $(item).find('.thumbs a img').attr("src");
       let title = $(item).find('.indexs h2 a').text()
       let obj = {src,title}
       str.push(obj)
    })

    let data = {
        data: str
    }

    // 把数据保存在文件中
    fs.writeFileSync(__dirname + '/data.txt',JSON.stringify(data))
}
