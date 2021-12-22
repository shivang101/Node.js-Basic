//how to require a module
const fs = require("fs");
//fs stands for file system used for
//reading and writing in files

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
