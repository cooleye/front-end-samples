function ajax(option){
    return new Promise((resolve,reject) =>{

        let xhr = new XMLHttpRequest()

        xhr.open("get",option.url)

        xhr.send()
        
        xhr.onload = function(){
            resolve(JSON.parse(xhr.responseText))
        }

        xhr.onerror = function(){
            reject("fail")
        }

    })
}