// 定义常量（不可以改变的变量）
const TYPES = {
  HEAD:"HEAD",
  BODY: "BODY",
  FOOD: "FOOD",
};
// 移动方向
const DIRECTIONS = {
  TOP:"top",
  DOWN:"down",
  LEFT:"left",
  RIGHT:"right"
}
// 默认方向是右
var curr_dir = DIRECTIONS.RIGHT;
// 容器
const container = document.querySelector("#container")

// 获取写屏幕/游戏区域的大小
const WIN_WIDTH = container.offsetWidth;
const WIN_HEIGHT = container.offsetHeight;


var SPEED = 200;

