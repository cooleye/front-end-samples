const express = require('express')
const app = express()
const cors = require('cors')
// 汉字转拼音
const { pinyin } = require('pinyin-pro');

app.use(cors())
const emails = [
    "abc@qq.com",
    "zs@163.com",
    "lisi@126.com"
]

// 表单验证：验证邮箱是否注册过
app.get("/regist", (req, res) => {

    let email = req.query.email;
    let password = req.query.password;

    if (email) {
        // 验证emails 是否包含email
        if (emails.includes(email)) {
            res.send({
                code: 201,
                message: "邮箱已经注册，更换其他邮箱"
            })
        } else {
            res.send({
                code: 2000
                message: "success"
            })
        }
    } else {
        res.send({
            code: 2001,
            message: "没有邮箱参数"
        })
    }
})

const data = require('./data.js')
// 省市区三级联动
app.get('/provinces', (req, res) => {
    let pid = req.query.pid;
    let cid = req.query.cid;

    if (pid && cid) {

        const prov = data.find(item => item.id === pid)
        const cities = prov.children;
        const city = cities.find(item => item.id === cid)
        let districts = city.children
        districts = districts.map(item => ({
            id: item.id,
            label: item.label,
            value: item.value,
        }))
        res.send(districts)
    } else if (pid) {
        const prov = data.find(item => item.id === pid)
        let cities = prov.children;
        cities = cities.map(item => ({
            id: item.id,
            label: item.label,
            value: item.value,
        }))
        res.send(cities)
    } else {
        const provinces = data.map(item => ({
            id: item.id,
            label: item.label,
            value: item.value,
        }))

        res.send(provinces)
    }
})

// 搜索
app.get('/search', (req, res) => {
    // 获得搜索关键字参数
    const keyword = req.query.k;
    const data = [
        "abc", "alone", "a dog", "awsl", "啊","啊我死啦","艾玛","爱玛",
        "banana", "buff", "back", "䨻","甭废话","别介","崩，沙卡拉卡","巴拉巴拉小魔仙",
        "html", "HTML5", "haha", "哈哈", "呵呵", "嘿嘿", "hello", "hello world", "hei ye", "history",
        "ege", "eee", "clone", "css", "css3",
    ]
    if (keyword) {
        res.send({
            code: 200,
            message: "success",
            data: data.filter(item => {
                // 如果关键字是英文，则把数组元素全部转为字母
                if (isEn(keyword)) {
                    return cn2en(item).startsWith(keyword)
                } else {
                    return item.startsWith(keyword)
                }
            })
        })
    }
})

// 汉字转英文
function cn2en(cn) {
    var pattern = new RegExp("[\u4E00-\u9FA5]+");

    if (cn && pattern.test(cn)) {
        return pinyin(cn, { toneType: 'none' });
    } else {
        return cn
    }
}
// 判断是否是英文
function isEn(key) {
    var isEN = new RegExp("[A-Za-z]+");
    return isEN.test(key)
}

app.listen(3000, () => console.log("服务器启动。。。"))