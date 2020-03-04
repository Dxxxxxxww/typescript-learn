// type annnotation 类型注解，我们告诉 ts 变量是什么类型
let count1: number
count1 = 123
// type inference 类型推断， ts 会自动的去尝试分析变量类型
let countInference = 123
// 如果 ts 能够自动分析变量类型，我们就什么都不需要做
// 如果 ts 无法分析变量类型，我们就需要使用类型注解
const firstNumber = 1
const secondNumber = 2
const total = firstNumber + secondNumber
//这里参数如果不加类型注解，类型推断会是 any 所以要加上。 --> 函数参数要加类型注解。
function getTotal1(firstNumber: number, secondNumber: number) {
	return firstNumber + secondNumber
}

const total1 = getTotal1(1, 2)

const obj = {
  name: 'dxx',
  age: 18
}

// ts 能推断的就不用加类型注解，推断不出来的，就加类型注解