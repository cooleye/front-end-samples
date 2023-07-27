let addBtn = document.querySelector(".add-btn")
let addbtn2 = document.querySelector("#addbtn2")
let cover = document.querySelector(".cover")
let inputText = document.querySelector("#input-text")
let container = document.querySelector(".container")
let inputPanel = document.querySelector(".input-panel")
// 待办事项的数组
let todos = [{
    id: 0,
    text: "任务",
    done: false
}]
// 把数据保存到localstorage
function saveToStorage() {
    localStorage.setItem("todos", JSON.stringify(todos))
}
// 从localstorage获取数据
function getFromStorage() {
    if (localStorage.getItem("todos") != 'undefined'
        && localStorage.getItem("todos") != 'null'
        && localStorage.getItem("todos")) {
        todos = JSON.parse(localStorage.getItem("todos"))
    }
    renderList()
}
// 第一次进入页面，先从本地存储获取数据
getFromStorage()


let pointx = [];

// 记录是否按下鼠标
let isPress = false;

// 渲染列表
function renderList() {
    let str = ""
    todos.forEach(todo => {
        str += `
            <div class="item" >
                <div class="item-content">
                    <div class="item-content-left">
                        <input type="checkbox" ${todo.done ? 'checked' : ''} data-id="${todo.id}">
                    </div>
                    <div class="item-content-right ${todo.done ? 'done' : ''}" data-id="${todo.id}"> ${todo.text} </div>
                </div>
                <button class="item-del" data-id="${todo.id}">删除</button>
            </div>`
    })
    container.innerHTML = str;
}

// 点击空白处，隐藏
cover.onclick = function (evt) {
    if (evt.target === this) {
        addBtn.classList.remove("animate__bounceOutRight")
        addBtn.classList.add("animate__bounceInRight")
        this.classList.add("hide")
        inputText.value = ""
        isLong = false;
    }
}

let editId = null
function showEdit(type, id) {
    editId = id;
    if (type === 'edit') {
        let todo = todos.find(item => item.id == id)
        inputText.value = todo.text
        addbtn2.innerHTML = "修改"
    } else {
        addbtn2.innerHTML = "添加"
    }
    // 输入框自动获取的焦点
   setTimeout(function(){
    inputText.focus()
   })


    cover.classList.remove("hide")
    cover.classList.add("animate__fadeIn")
    // 按钮的动画
    addBtn.classList.add("animate__bounceOutRight")


}
// 点击页面的添加按钮，弹出添加页面
addBtn.onclick = function () {
    showEdit('add')
}

// 点击弹框内的添加按钮，添加新的todo
function addTodo() {
    let text = inputText.value;
    if (editId && text) {
        todos.forEach(todo => {
            if (todo.id == editId) {
                todo.text = text
            }
        })

    } else if (text) {
        let todo = {
            // id: 使用随机数生成id
            id: Math.random().toString(16).slice(2),
            text: text,
            done: false
        }
        todos.unshift(todo)
    }
    // 隐藏弹框
    cover.classList.add("hide")

    addBtn.classList.remove("animate__bounceOutRight")
    addBtn.classList.add("animate__bounceInRight")
    // 清空输入框
    inputText.value = ""
    // 同步到本地存储
    saveToStorage()
    // 添加了新的todo，重新渲染列表
    renderList()

    isLong = false;

}
addbtn2.onclick = addTodo;
// 监听键盘回车按钮
window.addEventListener("keyup", function (evt) {
    if (evt.code === "Enter") {
        addTodo()
    }
})


// container 绑定事件
container.onclick = function (evt) {
    let item = evt.target;
    // 给删除按钮，绑定事件
    // 首先判断是不是删除按钮
    if (item.classList.value === "item-del") {
        let id = item.dataset.id;
        // 根据id，查找对应的todo的下标
        let doneIndex = todos.findIndex(todo => todo.id == id)
        // 根据下标，删除对应元素
        todos.splice(doneIndex, 1)[0]
        // 同步到本地存储
        saveToStorage()
        // 重新渲染类表
        renderList()
    }
}

//长按事件
let longTimer = null
let isLong = false;
function longClick(target) {
    clearTimeout(longTimer)
    longTimer = setTimeout(function () {
        showEdit("edit", target.dataset.id)
        console.log(1)
        isLong = true;
    }, 300)

}

// PC端鼠标划动事件
container.addEventListener("mousedown", function (evt) {
    evt.preventDefault()
    startHandler(evt.clientX)
    longClick(evt.target)
})
container.addEventListener("mousemove", function (evt) {
    moveHandler(evt.clientX, evt)
    clearTimeout(longTimer)
})
container.addEventListener("mouseup", endHandler)
// 移动端滑动事件
container.addEventListener('touchstart', function (evt) {
    evt.preventDefault()
    startHandler(evt.touches[0].clientX)
    longClick(evt.target)
})
container.addEventListener('touchmove', function (evt) {
    moveHandler(evt.touches[0].clientX, evt)
    clearTimeout(longTimer)
})
container.addEventListener('touchend', endHandler)

function startHandler(x) {
    isPress = true;
    pointx.push(x)
}


function moveHandler(x, evt) {

    if (isPress) {
        pointx.push(x)
    }

}
function endHandler(evt) {
    console.log(2)
    let itemContent = evt.target.parentNode;
    let last = pointx[pointx.length - 1]
    let first = pointx[0]
    let delta = last - first;

    if (delta < -50 && itemContent.classList.value === "item-content") {
        itemContent.style.transform = `translateX(-80px)`
    } else if (delta > 50 && itemContent.classList.value === "item-content") {
        itemContent.style.transform = `translateX(0px)`
    } else if (Math.abs(delta) < 2 && !isLong) {
        let item = evt.target;
        if (item.dataset.id) {
            // 从 data-id这个自定义属性上获取id
            let id = item.dataset.id;
            // 根据id，查找对应的todo的下标
            let todo = todos.find(todo => todo.id == id)
            let doneIndex = todos.findIndex(todo => todo.id == id)
            if (!todo.done) {
                todo.done = true
                item.parentNode.parentNode.querySelector(".item-content-right").classList.add("done-ani")
                setTimeout(function () {
                    // 根据下标，删除对应元素
                    todos.splice(doneIndex, 1)[0]
                    todos.push(todo)
                    // 同步到本地存储
                    saveToStorage()
                    // 重新渲染类表
                    renderList()
                }, 500)
            } else {
                todo.done = false
                todos.splice(doneIndex, 1)[0]
                todos.unshift(todo)
                // 同步到本地存储
                saveToStorage()
                // 重新渲染类表
                renderList()
            }
        }
    }

    isPress = false;
    pointx = []

    clearTimeout(longTimer)
}