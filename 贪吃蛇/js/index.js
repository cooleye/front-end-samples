//  全局定时器
var timer = null;
// var score = 0;
var gameOverDiv = document.querySelector('#game-over')
var gameStartDiv = document.querySelector('#game-start')
var scoreLabel = document.querySelector('#score')
var restart = document.querySelector("#restart")
var startBtn = document.querySelector("#start")
var scoreLabelStart = document.querySelector("#score-label")
// 获取音频标签
var bgmusic = document.querySelector("#bgmusic")
var eatmusic = document.querySelector("#eatmusic")
var failmusic = document.querySelector("#failmusic")

// 保存所有蛇的身体
var snakes = [];


var food;
// 生成食物
function makeFood() {
  var x = Math.floor((Math.random() * (WIN_WIDTH-50)) / 50) * 50;
  var y = Math.floor((Math.random() * (WIN_HEIGHT-50)) / 50) * 50;
  food = new Block(50, 50, x, y, TYPES.FOOD, container, ["block"]);
}


function startGame() {
  makeFood();
  // 播放背景音乐
  bgmusic.currentTime = 0;
  bgmusic.play()
  // 蛇头
  var block = new Block(50, 50, 100, 100, TYPES.HEAD, container, ["block"]);
  snakes.push(block);

  // 蛇移动
  timer = setInterval(function () {
    var x, y;
    switch (curr_dir) {
      case DIRECTIONS.TOP:
        y = block.y - block.height;
        break;
      case DIRECTIONS.DOWN:
        y = block.y + block.height;
        break;
      case DIRECTIONS.LEFT:
        x = block.x - block.width;
        break;
      case DIRECTIONS.RIGHT:
        x = block.x + block.width;
        break;
    }

    // 遍历snakes数组，获得所有的身体
    for (var i = snakes.length - 1; i >= 0; i--) {
      if (i === 0) {
        snakes[0].move({
          x: x,
          y: y,
        });
        if (collision(snakes[0])) {
          gameOver();
        }
      } else {
        snakes[i].move({
          x: snakes[i - 1].x,
          y: snakes[i - 1].y,
        });
      }
    }

    // 判断蛇头的坐标和食物的坐标是否一致，如果一直，则吃掉食物，蛇的身体增长一节
    if ((snakes[0].x === food.x) & (snakes[0].y === food.y)) {
      // food消失
      food.remove();
      // 播放吃的音效
      eatmusic.play()
      // 蛇增长
      var b = new Block(50, 50, food.x, food.y, TYPES.BODY, container, ["block"]);
      snakes.push(b);

      // 重新生成一个food
      makeFood();

      scoreLabelStart.innerText = snakes.length-1
    }
  }, SPEED);

}
startBtn.onclick = function(){
  startGame()
  gameStartDiv.classList.add("hide")
}

// 游戏结束,清空定时器
function gameOver() {
  clearInterval(timer)
  failmusic.play()
  console.dir(bgmusic)
  bgmusic.pause()
  scoreLabel.innerText = snakes.length - 1 + "分";
  gameOverDiv.classList.remove("hide")

}

// 重新开始
restart.onclick = function () {

  // 重新开始，数据要重置
  // 清空snake
  snakes = [];
  // 清空容器
  container.innerHTML = ""
  scoreLabelStart.innerText = "0"
  gameOverDiv.classList.add("hide")
  // 设置默认移动方向
  curr_dir = DIRECTIONS.RIGHT;
  startGame()
}

// 边缘检测，超出四个边，game over
function collision(head) {
  console.log(head.x, head.y)
  if (head.x < 0 || head.x > WIN_WIDTH - head.width || head.y < 0 || head.y > WIN_HEIGHT - head.height) {
    return true;
  } else {
    return false;
  }
}

// FPS RPG APRG 动作类

// 监听键盘事件，判断是否点击WASD键
window.addEventListener("keyup", function (event) {
  switch (event.key) {
    case "w":
      curr_dir = DIRECTIONS.TOP;
      break;
    case "a":
      curr_dir = DIRECTIONS.LEFT;
      break;
    case "s":
      curr_dir = DIRECTIONS.DOWN;
      break;
    case "d":
      curr_dir = DIRECTIONS.RIGHT;
      break;
  }
});
