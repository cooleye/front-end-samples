const modb = (() => {
    var num = 200;

    function setNum(val) {
        num = val;
    }
    function getNum() {
        return num
    }

    return {
        setNum, getNum
    }
})()