//how to require a module
const fs = require("fs");
//fs stands for file system used for
//reading and writing in files

const http = require("http");
const url = require("url");

//FILES
/*
// fs.readFileSync(path,encoding)
const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
//Sync stands for synchronous(BLOCKING CODE)
//Each statement is processed one after another
//We should use Asynchronous code
console.log(textIn);

const today = new Date();
const year = String(today.getFullYear());
const month = String(today.getMonth() + 1).padStart(2, 0);
const date = String(today.getDate()).padStart(2, 0);
const hours = String(today.getHours()).padStart(2, 0);
const mins = String(today.getMinutes()).padStart(2, 0);

const textOut = `this is what we know about the avocado ${textIn}.\nCreated on ${date}/${month}/${year}\ntime was ${hours}:${mins}`;
fs.writeFileSync("./txt/output.txt", textOut);

console.log("File Written");

///////////////////////////////////////////////////////////////////
//Non-Blocking, asynchronous way

// fs.readFile("path","file_encoding",callBackFuntion)
fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
  if (err) return console.log("Error 💥💥");

  fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
    console.log(data2);
    fs.readFile("./txt/append.txt", "utf-8", (err, data3) => {
      console.log(data3);

      //for writing file (path,data,encoding,function)
      fs.writeFile("./txt/final.txt", `${data2}\n${data3}`, "utf-8", (err) => {
        console.log("Your file has been written");
      });
    });
  });
});
console.log("Reading the file");
*/
//////////////////////////////////////
//SERVER
//

//request object and respond object
const server = http.createServer((req, res) => {
  console.log(req.url);

  //Routing
  const pathName = req.url;

  if (pathName === "/overview" || pathName === "/") {
    res.end("This is the overview Page");
  } else if (pathName === "/product") {
    res.end("This is the Product page");
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
      "my-own-header": "hello-world", //made up header
      //these header and status code must be set before res.end
    });
    res.end("<h1>This Page could not be found</h1>");
  }
});
// above code executes on every new requests

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to requests on port 8000");
});
