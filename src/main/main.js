import {multi} from './func.js'
let a = [1, 2, 3 ,5 ,6]
let b = [9, 8, 3, 6, 9]
let ab = [...a, ...b]
let abc = new Set(abc)
console.log("abc = ", abc)
console.log("m abc = ", multi([...abc], 2))