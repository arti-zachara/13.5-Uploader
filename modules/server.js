var http = require("http");
var colors = require("colors");
var handlers = require("./handlers");

function start() {
  function onRequest(request, response) {
    console.log("Odebrano zapytanie.");
    console.log("Zapytanie " + request.url + " odebrane.");
    // if (request.url === "/favicon.ico") {
    //   response.writeHead(200, { "Content-Type": "image/x-icon" });
    //   response.end();
    //   console.log("favicon requested");
    //   return;
    // }
    response.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });

    switch (
      request.url // rozrónianie zapytań
    ) {
      case "/":
      case "/start":
        handlers.welcome(request, response);
        break;
      case "/upload":
        handlers.upload(request, response);
        break;
      case "/show":
        handlers.show(request, response);
        break;
      case "/css/style.css":
        handlers.css(request, response);
        break;
      case "/images/server.png":
        handlers.serverImage(request, response);
        break;
      default:
        handlers.error(request, response);
    }
  }

  http.createServer(onRequest).listen(9000);

  console.log("Serwer został uruchomiony pomyślnie !".green);
}

exports.start = start;
