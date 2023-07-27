// 蛇的身体
function Block(width, color, x, y,className) {
    this.ele = document.createElement("div")
    this.ele.style.width = width + 'px';
    this.ele.style.height = width + 'px';
    this.ele.style.backgroundColor = color;
    this.ele.style.position = "absolute"
    this.ele.style.left = x + 'px';
    this.ele.style.top = y + 'px';
    this.ele.style.borderRadius = '5px'
    this.x = x;
    this.y = y;
    this.ele.classList.add(className)
    container.appendChild(this.ele)
}
Block.prototype.move = function (x, y) {

    if (x != undefined) {
        this.x = x;
        this.ele.style.left = x + 'px'
    }
    if (y != undefined) {
        this.y = y;
        this.ele.style.top = y + 'px'
    }
}
Block.prototype.remove = function () {
    container.removeChild(this.ele)
}