import utils from "./utils";
import "./index.css";
import "./index.scss";

let img1 = document.createElement("img");
img1.src = require("./small.png");
document.body.appendChild(img1);

let img2 = document.createElement("img");
img2.src = require("./big.png");
document.body.appendChild(img2);

const set = new Set([1, 2, 2, 3])
let arr = [];
for (let i = 0; i < 4; i++) {
  arr.push({
    name: `id_${i}`,
    level: Math.floor(Math.random() * i + 10)
  })
}

let list = [...set, ...arr]

const fn = (x) => {
  return x**x;
}

console.log("hello")
console.log("list = ", list);
console.log("isArray = ", utils.isArray(list));

if (process.env.NODE_ENV === "development" && module.hot) {
  module.hot.accept()
}