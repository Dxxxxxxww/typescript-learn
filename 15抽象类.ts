// readonly
// class Paper {
// 	public readonly name: string
// 	constructor(name: string) {
// 		this.name = name // readonly 属性 只能在 constructor 里赋值一次
// 	}
// 	setName(name: string) {
// 		this.name = name //  不能设置 因为 name 是 readonly
// 	}
// }

// const paper = new Paper('纸')
// console.log(paper.name)
// paper.name = '巾' // 不能设置 因为 name 是 readonly
// console.log(paper.name)

// 抽象类。抽象类是把类相关的东西抽象出来。抽象类只能被继承，不能实例化
// abstract class Geom {
// 	// 抽象类里面可以写具体属性
// 	width: number
// 	height: number
// 	// 获取面积
// 	// 类里有方法不知道该如何实现(每个子类可以不同的实现的话)，可以加个关键字 abstract
// 	// 来定义这个方法，交给子类实现
// 	// 抽象方法只能存在抽象类中
// 	abstract getArea(): number
// 	// 抽象类里面也可以写具体的方法
// 	getType() {
// 		return 'Gemo'
// 	}
// }
// // 子类继承抽象类，就必须实现抽象类里的抽象方法
// class Circle extends Geom {
// 	getArea() {
// 		return 123
// 	}
// }
// class Square {}
// class Triangle {}

// 接口复习。接口是把对象啊等其他的东西抽象出来
// 二次抽离的接口
interface Person12 {
	name: string
}

interface Teacher12 extends Person12 {
	teachingAge: number
}
interface Student extends Person12 {
	age: number
}
// 如果职业越多，那么下面的函数 | 的就要越多，所以这时候可以对接口再进行抽离
interface Driver extends Person12 {
	age: number
	car: string
}
const teacher12 = {
	name: 'ytt',
	teachingAge: 2
}
const student = {
	name: 'kobe',
	age: 24
}
const getUserInfo = (user: Person12) => {
	console.log(user.name)
}
getUserInfo(teacher12)
getUserInfo(student)
