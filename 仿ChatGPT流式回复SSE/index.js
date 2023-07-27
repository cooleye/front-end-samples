const http = require('http');

const PORT = 3000;

// 创建HTTP服务器
const server = http.createServer((req, res) => {
  // 设置响应头，指定SSE的Content-Type和Cache-Control
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  // 发送初始化事件，用于建立SSE连接
  res.write('event: init\n');
  res.write('data: Connected to SSE server\n\n');

  // 每隔一秒发送一个SSE事件
  const interval = setInterval(() => {
    const data = new Date().toUTCString();
    res.write('data: ' + data + '\n\n');
  }, 1000);

  // 当客户端关闭连接时，清除定时器
  req.on('close', () => {
    clearInterval(interval);
  });
});

// 启动服务器
server.listen(PORT, () => {
  console.log(`SSE server is running at http://localhost:${PORT}`);
});
