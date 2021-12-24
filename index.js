const fs = require("fs");
const http = require("http");
const url = require("url");

//////////////////////////////////////
//SERVER
//
const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data); //json to javascript here array of objects(string to object)

//request object and respond object
const server = http.createServer((req, res) => {
  console.log(req.url);

  //Routing
  const pathName = req.url;

  //Overview Page
  if (pathName === "/overview" || pathName === "/") {
    res.writeHead(200, {
      "content-type": "text/html",
    });
    res.end(tempOverview);
  }
  //Product Page
  else if (pathName === "/product") {
    res.end("This is the Product page");
  }
  //API
  else if (pathName === "/api") {
    res.writeHead(200, {
      "Content-type": "application/json",
    });
    res.end(data); ///can only send back a string
  } else {
    //status code , object(optional)
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
