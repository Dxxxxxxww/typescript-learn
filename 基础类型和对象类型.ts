// 基础类型 null, undefined, symbol, boolean, void
let count: number
count = 123

const studentName: string = 'dxx'
// 对象类型
// 对象
const student: {
	name: string
	age: number
} = {
	name: 'dxx',
	age: 18
}
//数值数值
const numbers: number[] = [1, 2, 3]
//类对象
class Person {}
const person: Person = new Person()
//函数
const getTotal: () => number = () => {
	return 123
}
const getTotal2: (a: number) => number = function(a: number) {
	return a
}