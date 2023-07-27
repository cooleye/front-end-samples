// 游戏容器
const game = document.querySelector(".game");
const WIN_WIDTH = game.offsetWidth;
const WIN_HEIGHT = game.offsetHeight;
// 开始页面
const homePage = document.querySelector(".home-page");

// 游戏层，保存蛇和食物
const container = document.querySelector(".container");

// 开始按钮
const startBtn = document.querySelector("#start-btn");

// 移动方向
const DIRECTION = {
  LEFT: "left",
  RIGHT: "right",
  UP: "UP",
  DOWN: "DOWN",
};

//蛇的初始颜色
const SNAKE_INITIAL_COLOR = "#fff";
// 舍得初始大小，也是每次移动的距离
const SNAKE_INITIAL_SIZE = 50;

// 蛇的出生位置
const BIRTH_POS = {
  x: 0,
  y: 100,
};
let  SPEED = 200;
let levelInput = document.querySelectorAll("input");

for (let i = 0; i < levelInput.length; i++) {
      console.log(levelInput[i])
      levelInput[i].addEventListener('change',function(){
         if(this.checked){
            SPEED = this.value-0
         }
      })
}

// 蛇的移动速度，也就是定时器触发频率，频率越高，速度越快

