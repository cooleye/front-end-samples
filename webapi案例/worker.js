

var num = 1;
function update(){

    setTimeout(() =>{
        update()
    },1000)
    
    // 把当前线程的数据发送出去
    postMessage(num)
    num++;

}

update()

