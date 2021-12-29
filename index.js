//core modules
const fs = require("fs");
const http = require("http");
const url = require("url");

const slugify = require("slugify");
//own modules
const moduleFunction = require("./Modules/replaceTemplate");
//////////////////////////////////////
//SERVER

const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data); //json to javascript here array of objects(string to object)

console.log(slugify("Fresh Avocados", { lower: true }));

const slugs = dataObj.map((el) =>
  slugify(el.productName, { lower: true, replacement: "--" })
);
console.log(slugs);

//request object and respond object
const server = http.createServer((req, res) => {
  console.log(req.url);

  const { query, pathname } = url.parse(req.url, true);
  //Routing

  //Overview Page
  if (pathname === "/overview" || pathname === "/") {
    // res.writeHead(301, { "Location": "/about" });
    // res.end();

    res.statusCode = 301;
    res.setHeader("Location", "/about");
    res.end();
  }
  //REDIRECTING PAGES
  else if (pathname === "/about") {
    const cardsHtml = dataObj
      .map((el) => moduleFunction(tempCard, el))
      .join("");

    const output = tempOverview.replace("{%PRODUCT_CARDS%}", cardsHtml);
    res.end(output);
  }
  //Product Page
  else if (pathname === "/product") {
    res.writeHead(200, { "content-type": "text/html" });

    const product = dataObj[query.id];
    const output = moduleFunction(tempProduct, product);
    res.end(output);
  }
  //API
  else if (pathname === "/api") {
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
