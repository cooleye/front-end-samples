// 定义蛇身体的构造函数
function Block(width, height, x, y, type, container, classNames) {

    this.width = width;
    this.height = height
    this.x = x;
    this.y = y;
    this.type = type;
    this.container = container;

    this.ele = document.createElement('div')
    this.ele.style.position = 'absolute';
    this.ele.style.width = this.width + 'px';
    this.ele.style.height = this.height + 'px'
    this.ele.style.top = this.y + 'px'
    this.ele.style.left = this.x + 'px'

    if (type === TYPES.HEAD) {
        // this.ele.classList.add("snake-head")
        this.ele.innerText = "🐷"
    } else if (type === TYPES.BODY) {
        // this.ele.classList.add("snake-body")
        this.ele.innerText = "🍔"
    } else if (type === TYPES.FOOD) {
        this.ele.innerText = "🍔"
        this.ele.classList.add("bink")
    }
    for (var cn of classNames) {
        this.ele.classList.add(cn)
    }
    // 添加到一个父元素中
    container.appendChild(this.ele)
}

// 蛇身体移动的方法
Block.prototype.move = function ({ x: x, y: y }) {

    if (y !== undefined) {
        this.ele.style.top = y + 'px'
        this.y = y;
    }

    if (x !== undefined) {
        this.ele.style.left = x + 'px'
        this.x = x;
    }
}

// 消失的方法
Block.prototype.remove = function () {
    this.container.removeChild(this.ele)
}