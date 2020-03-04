function hello() {}

const hello1 = function() {}

const hello2 = () => {}
// 当函数返回值有可能会被强转为另一种类型，就需要给函数加上返回值的类型注解。
function add(first: number, second: number): number {
	return first + second
	// return first + second + ''
}

const total3 = add(1, 2)
// 函数没有返回值
function sayHello(): void {
	console.log('hello')
}
// 这个意思是说此函数永远不可能执行完
function errorEmitter(): never {
	throw new Error()
	// while (true) {}
	console.log(123)
}
// 对于参数解构
function add1({ first, second }: { first: number; second: number }): number {
	return first + second
}

const totalAdd1 = add1({ first: 1, second: 2 })

function getNumber({ first }: { first: number }) {
	return first
}
const countGetNumber = getNumber({ first: 1 })
