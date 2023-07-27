
var http = require("http");
var fs = require("fs");

http.createServer(function (req, res) {
  var fileName = "." + req.url;

  if (fileName === "./stream") {
    res.writeHead(200, {
      "Content-Type":"text/event-stream",
      "Cache-Control":"no-cache",
      "Connection":"keep-alive",
      "Access-Control-Allow-Origin": '*',
    });

    res.write("retry: 10000\n");
    res.write("event: connecttime\n");
    res.write("data: " + (new Date()) + "\n\n");

    var index = 0;
    fs.readFile("./text.txt",(err,data) =>{
        if (err) {
            console.log(err);
        }else{
            var text = data.toString()
            interval = setInterval(function () {
                if(text[index]){
                    res.write("data: " + text[index] + "\n\n");
                    index++
                }
               
              }, 100);
        }
    })

  

    req.connection.addListener("close", function () {
      clearInterval(interval);
    }, false);
  }
}).listen(8844, "127.0.0.1");