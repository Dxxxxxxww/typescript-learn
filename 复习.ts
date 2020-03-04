// 基础类型 number string boolean undefined null symbol void
let c: number
c = 123
// 对象类型 [] {} class function
const func = (str: string) => {
	return parseInt(str, 10)
}

const func1: (str: string) => number = str => {
	return parseInt(str, 10)
}

const date = new Date()

// 其他的 case
interface Person {
	name: string
}
const rawData = '{"name": "dxx"}'
const newData: Person = JSON.parse(rawData)

let temp: number | string = 123
temp = '456'
