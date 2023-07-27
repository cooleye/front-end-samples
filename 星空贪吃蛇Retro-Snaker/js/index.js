// 游戏状态: true表示游戏已经开始，false表示游戏结束
let GAME_STATUS = false;
// 蛇，用一个数组 存储蛇的身体
let snake = [];
// timer: 定时器
let timer = null;

// 食物
let food = null;
// 默认方向是向右
let direc = DIRECTION.RIGHT;
// 点击开始按钮
startBtn.onclick = function () {
  startGame();
};

function startGame() {
  // 数据初始化
  GAME_STATUS = true;
  snake = [];
  timer = null;
  food = null;
  direc = DIRECTION.RIGHT;

  // 隐藏开始界面
  homePage.classList.add("hide");
  // 先清空游戏层
  container.innerHTML = "";

  let block = new Block(
    SNAKE_INITIAL_SIZE,
    SNAKE_INITIAL_COLOR,
    BIRTH_POS.x,
    BIRTH_POS.y,
    "shadow-green"
  );
  snake.push(block);

  moveSnake();

  createFood();
}

// 产生食物
function createFood() {
  let x =
    Math.floor(Math.random() * (WIN_WIDTH / SNAKE_INITIAL_SIZE)) *
    SNAKE_INITIAL_SIZE;
  let y =
    Math.floor(Math.random() * (WIN_HEIGHT / SNAKE_INITIAL_SIZE)) *
    SNAKE_INITIAL_SIZE;
  x = x > WIN_WIDTH - WIN_HEIGHT ? x - SNAKE_INITIAL_SIZE : x;
  y = y > WIN_HEIGHT - WIN_HEIGHT ? y - SNAKE_INITIAL_SIZE : y;
  food = new Block(SNAKE_INITIAL_SIZE, "red", x, y, "shadow-red");
}

// 蛇移动
function moveSnake() {
  timer = setInterval(function () {
    for (let i = snake.length - 1; i >= 0; i--) {
      if (i === 0) {
        let x, y;
        switch (direc) {
          case DIRECTION.LEFT:
            x = snake[i].x - SNAKE_INITIAL_SIZE;
            break;
          case DIRECTION.RIGHT:
            x = snake[i].x + SNAKE_INITIAL_SIZE;
            break;
          case DIRECTION.UP:
            y = snake[i].y - SNAKE_INITIAL_SIZE;
            break;
          case DIRECTION.DOWN:
            y = snake[i].y + SNAKE_INITIAL_SIZE;
            break;
          default:
            x = snake[0].x + SNAKE_INITIAL_SIZE;
        }

        // 判断是否失败
        if (x < 0 || x > WIN_WIDTH || y < 0 || y > WIN_HEIGHT) {
          console.log("game over");
          clearInterval(timer);
          homePage.classList.remove("hide");
          break;
        } else {
          snake[0].move(x, y);
        }
      } else {
          x = snake[i - 1].x;
          y = snake[i - 1].y;
          snake[i].move(x, y);
      }
    }

    // 吃掉食物，移动之后判断蛇的坐标和食物坐标是否相等，相等则把食物吃掉
    // 然后生成新的一节身体，添加到蛇尾
    if (food) {
      if (snake[0].x == food.x && snake[0].y == food.y) {
        food.remove();
        let block = new Block(
          SNAKE_INITIAL_SIZE,
          SNAKE_INITIAL_COLOR,
          food.x,
          food.y,
          "shadow-green"
        );
        snake.push(block);
        createFood();
      }
    }
  }, SPEED);
}

// 判断头是否和身体重合
function eatSelf(i) {
  if (i > 0) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

// 键盘控制方向
window.addEventListener("keyup", function (e) {
  switch (e.key) {
    case "a":
      direc = DIRECTION.LEFT;
      break;
    case "w":
      direc = DIRECTION.UP;
      break;
    case "d":
      direc = DIRECTION.RIGHT;
      break;
    case "s":
      direc = DIRECTION.DOWN;
      break;
  }
});
