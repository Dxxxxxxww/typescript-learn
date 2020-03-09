// 接口就是在开发过程中 ts 帮助我们做语法提示的工具，真正编译成 js 时，代码中的接口和类型都会被剔除掉，并不会真正的变成 js 代码。

interface Person {
	// readonly name: string, // readonly 表示只读属性
	name: string
	age?: number // 表示 age 这个属性可有可无
	[propName: string]: any // 表示出了上面两个属性之外，还可以有另外的属性，属性名是 string 类型，值是 any 类型，这样的话，下面的 字面量形式(带 sex 的) 赋值 就不会报错了
	say(): string // 表示一个 say 方法，返回值是 string 类型
}

type Person1 = {
	name: string
}

// type 和 interface 的区别不大，但是也有个区别

/*
// interface 只能代表一个函数或者对象，无法代表基础类型，还可以定义类似数组这样的索引类型
interface Person {
	name: string
}
// type(类型别名) 可以给 Person1 直接定义成 string 类型，而 interface 就不行
type Person1 = string 

// 在 ts规范 中，如果能使用 interface 的就用 interface 实在用不了的用 type
*/

// 防止形参 person 是 undefined 而导致函数报错，给形参加类型注释是一种解决办法
const getPersonName = (person: Person): void => {
	console.log(person.name)
}
// person: { name: string } 这里的这种类型注解与上面函数中一样，重复了，我们可以使用 interface 来定义个类型，就不用写重复代码了
const setPersonName = (person: Person, name: string): void => {
	person.name = name
}

const person = {
	name: 'dxx',
	sex: 'male', // 当多出一个 interfa 里没有的属性
	say() {
		return 'say hello'
	}
}
// 如果缓存一下这个变量再传值，就不会这么严格，只要具备了 interface 里面必需的东西就行了
getPersonName(person) // 这样不会报错

// 当以这种方式传值(字面量)时，ts 会进行强校验
// getPersonName({
// 	name: 'dxx',
// 	sex: 'male' // 当多出一个 interfa 里没有的属性
// }) // 这样会报错

setPersonName(person, 'ytt')

// class 可以应用 interface
// 当类引用接口时，就要求类里必须具备接口里的属性
class Users implements Person {
	name: string // 或者 name = 'dxx'
	say() {
		return 'hello'
	}
}

// 接口之间可以互相继承
interface Parents extends Person {
	teach(): string
}

const setPersonName2 = (person: Parents, name: string): void => {
	person.name = name
}

// setPersonName2(person,'ytt') // 报错，缺少 teach 方法实现
const parents = {
	name: 'dxx',
	sex: 'male', // 当多出一个 interfa 里没有的属性
	say() {
		return 'say hello'
	},
	teach() {
		return 'haha'
	}
}
setPersonName2(parents, 'ytt') // 不报错

// 接口定义函数
interface sayHi {
	(word: string): string //传入 word string类型，返回 string类型
}

const say: sayHi = (w: string) => {
	return 'aa'
}
