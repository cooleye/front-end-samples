// 定义蛇身体的构造函数
class Block {

    constructor(width, height, x, y, type, container, classNames) {
        this.width = width;
        this.height = height
        this.x = x;
        this.y = y;
        this.type = type;
        this.container = container;
        this.classNames = classNames;
        this.ele = document.createElement('div')
        this._init()
    }
    // _开头的表示是内部方法，不提供对外访问
    _init() {
        this.ele.style.position = 'absolute';
        this.ele.style.width = this.width + 'px';
        this.ele.style.height = this.height + 'px'
        this.ele.style.top = this.y + 'px'
        this.ele.style.left = this.x + 'px'

        if (this.type === TYPES.HEAD) {
            // this.ele.classList.add("snake-head")
            this.ele.innerText = "🐷"
        } else if (this.type === TYPES.BODY) {
            // this.ele.classList.add("snake-body")
            this.ele.innerText = "🍔"
        } else if (this.type === TYPES.FOOD) {
            this.ele.innerText = "🍔"
            this.ele.classList.add("bink")
        }
        for (var cn of this.classNames) {
            this.ele.classList.add(cn)
        }
        // 添加到一个父元素中
        this.container.appendChild(this.ele)
    }
    // 蛇身体移动的方法
    move({ x: x, y: y }) {

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
    remove() {
        this.container.removeChild(this.ele)
    }

}
