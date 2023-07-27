const moda = (() => {
    var num = 100;

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