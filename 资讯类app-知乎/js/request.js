function request(option) {
    return new Promise(function (resolve, reject) {

        // 默认参数
        let defaultOption = {
            method: "get",
            headers: {}
        }
        // 合并对象
        defaultOption = {
            ...defaultOption,
            ...option
        }

        let xhr = new XMLHttpRequest()

        // 判断请求方法，如果是get请求，把参数拼接到url  
        if (defaultOption.method.toLowerCase() === 'get') {
            let params = json2str(defaultOption.data)
            xhr.open(defaultOption.method, `${defaultOption.url}?${params}`)

            xhr.send(null)
        } else if (defaultOption.method.toLowerCase() === 'post') {
            xhr.open(defaultOption.method, defaultOption.url)
            // 设置请求头
            for (let key in defaultOption.headers) {
                xhr.setRequestHeader(key, defaultOption.headers[key])
            }

            if (defaultOption.headers["Content-Type"]
                && defaultOption.headers["Content-Type"] === "application/json"
            ) {
                xhr.send(JSON.stringify(defaultOption.data))
            } else {
                let params = json2str(defaultOption.data)
                xhr.send(params)
            }
        }


        xhr.onload = function () {
            resolve(xhr.responseText)
        }
        xhr.onerror = function () {
            reject("请求失败")
        }

        // 把对象转成k=v格式的字符串 {a:1,b:2,c:3,d:4} => k1=v1&k2=v2
        // a=1&b=2&c=3&d=4
        function json2str(json) {
            let str = ``
            for (let key in json) {
                str += `${key}=${json[key]}&`
            }
            return str.slice(0, str.length - 1)
        }

    })
}


// 形参 实参