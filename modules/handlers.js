"use strict";

var fs = require("fs");
var formidable = require("formidable");

//my variables
var fileUrl;

exports.upload = function(request, response) {
  console.log("Rozpoczynam obsługę żądania upload.");
  var form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(request, function(error, fields, files) {
    fileUrl = "upload/" + files.upload.name;
    fileUrl = fileUrl.toString();
    fs.rename(files.upload.path, fileUrl, function(err) {
      if (err) throw error;
      console.log("Zmieniono katalog plików");
    });
    fs.readFile("templates/upload.html", function(err, html) {
      response.writeHead("200", { "Content-Type": "text/html; charset=utf-8" });
      response.write(html);
      response.write("<img src='/show' />");
      response.end();
    });
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
  fs.readFile(fileUrl, "binary", function(error, file) {
    response.writeHead(200, { "Content-Type": "image/png" });
    response.write(file, "binary");
    response.end();
  });
};

exports.css = function(request, response) {
  fs.readFile("css/style.css", function(error, file) {
    response.writeHead(200, { "Content-Type": "text/css" });
    response.write(file, "binary");
    response.end();
  });
};

exports.serverImage = function(request, response) {
  fs.readFile("images/server.png", function(error, file) {
    response.writeHead(200, { "Content-Type": "image/jpg" });
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
