module.exports = {
	"env": {
		"browser": true,
		"es6": true
	},
	"extends": "eslint:recommended",
	"globals": {
		"Atomics": "readonly",
		"SharedArrayBuffer": "readonly"
	},
	"parserOptions": {
		"ecmaVersion": 2018,
		"sourceType": "module"
	},
	"rules": {
		"no-const-assign": 2,//禁止修改const声明的变量
		"no-multiple-empty-lines": [1, {"max": 2}],//空行最多不能超过2行
		"no-trailing-spaces": 1,//一行结束后面不要有空格
		"indent": 2, //缩进风格
		"strict": 2 //使用严格模式
	}
};