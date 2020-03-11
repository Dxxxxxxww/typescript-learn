// public 允许在类内外使用
// private 允许在类内使用
// protected 允许在类及继承类内使用

// class Subject {
//   name: string
// }

// const subject = new Subject()
// subject.name = 'math'
// console.log(subject.name) // 不加访问类型则默认是 public

// constructor
// class Subject {
// 	// 传统写法
// 	// public name: string
// 	// constructor(name: string) {
// 	//   this.name = name
// 	// }
// 	// 这段代码等同于上面代码 简化写法
// 	constructor(public name: string) {}
// }
// const subject = new Subject('math')

class Subject {
	constructor(public name: string) {}
}

class Shuxue extends Subject {
	constructor(public age: number) {
    super('shuxue')
  }
	sayHi() {
		//可以继承到父类的 this.name
		console.log(this.name)
	}
}

// 执行这句话，首先执行 Shuxue 的 constructor，给 age 属性赋值
// 之后执行父类构造函数，给父类 name 属性赋值，父类有了 name(public) 属性，子类也就有了 
const math = new Shuxue(150)
console.log(math.age) // 150
console.log(math.name) // shuxue