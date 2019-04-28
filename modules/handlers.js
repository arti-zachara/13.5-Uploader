var fs = require("fs");
var formidable = require("formidable");

exports.upload = function(request, response) {
  console.log("Obsługa żądania upload rozpoczęta.");
  var form = new formidable.IncomingForm();
  form.parse(request, function(error, fields, files) {
    fs.renameSync(files.upload.path, "test.png");
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write("received image:<br/>");
    response.write("<img src='/show' />");
    response.end();
  });
};

exports.welcome = function(request, response) {
  console.log("Obsługa żądania welcome rozpoczęta.");
  fs.readFile("templates/start.html", function(err, html) {
    response.writeHead(200, { "Content-type": "text/html, charset=utf-8" });
    response.write(html);
    response.end();
  });
};

exports.show = function(request, response) {
  fs.readFile("test.png", "binary", function(error, file) {
    response.writeHead(200, { "Content-Type": "image/png" });
    response.write(file, "binary");
    response.end();
  });
};

exports.error = function(request, response) {
  console.log("Nie wiem co robić.");
  fs.readFile("templates/404.jpg", function(err, data) {
    response.statusCode = 404;
    if (!err) response.write(data);
    // err handling
    response.end();
  });
};
