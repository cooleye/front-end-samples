const request = ({
    method = "get",
    url,
    headers = {
        "Content-Type": "application/x-www-form-urlencoded"
    },
    data
}) => {

    return new Promise((resolve, reject) => {

        const xhr = new XMLHttpRequest()

        if (method === 'get') {
            // {a:1,b:2}  => a=1&b=2
            xhr.open(method, `${url}?${json2str(data)}`)
            xhr.send()
        } else {
            xhr.open(method, url)
            if (typeof headers === 'object' && headers !== null) {
                for (let key in headers) {
                    xhr.setRequestHeader(key, headers[key])
                }
            }

            if (headers['Content-Type'] === 'application/x-www-form-urlencoded') {
                xhr.send(json2str(data))

            } else if (headers['Content-Type'] === 'application/json') {
                // {a:1,b:2}
                xhr.send(JSON.stringify(data))
            }
        }

        function json2str(json) {
            let params = ''
            for (let k in data) {
                params += `&${k}=${data[k]}`
            }
            return params.slice(1);
        }

        xhr.onload = function () {
            resolve(JSON.parse(xhr.responseText))
        }

        // xhr.onreadyStateChange = function(){
        //     if(xhr.readyState === 4){
        //         if(xhr.status === 200){
        //             resolve(xhr.responseText)
        //         }
        //     }
        // }
        xhr.onerror = function () {
            reject(xhr.status)
        }
    })
}