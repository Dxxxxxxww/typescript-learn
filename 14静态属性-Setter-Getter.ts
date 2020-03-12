// getter setter
// class Cup {
//   constructor(private _name: string){}
//   get name() { // get属性 一般来说会这么写。私有变量加 _ ，get 就用私有变量名
//     return this._name + 'beizi' //通过这种方式(加后缀或者前缀进行类似加密的方式)获取私有属性可以保护私有属性的安全性
//   }
//   set name(name: string) {
//     // set 也可以对私有变量进行保护
//     const realName = name.split(' ')[0]
//     this._name = realName
//   }
// }

// const cup = new Cup('baowen')
// console.log(cup.name)
// cup.name = 'make bei'
// console.log(cup.name)

// 单例模式 只允许有一个实例
class Single {
	private static instance: Single
	private constructor(public name: string) {}
	static getInstance(name: string) {
    if (!this.instance) {
      this.instance = new Single(name)
    }
		return this.instance
	}
}

// const single = new Single() //报错，因为 constructor 是私有的，类外无法访问。
const single = Single.getInstance('danli')
console.log(single.name)