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
// 单例模式 只允许有一个实例 这个类提供了一种访问其唯一的对象的方式，可以直接访问，不需要实例化该类的对象。
var Single = /** @class */ (function () {
    function Single(name) {
        this.name = name;
    }
    // 单例模式需要通过一个类方法来获取实例，而不是一个普通方法(普通方法是实例访问，那不就自相矛盾了么)
    Single.getInstance = function (name) {
        // 对于 js 而言， 这里可以使用 this 因为 js中的 类是 function 的语法糖，这里的 this 指向函数本身,注1
        // 而对于其他面向对象语言 static 函数是挂载到类上的，没有 this 所以这里应该使用 Single.instance
        // if (!this.instance) {
        // 	this.instance = new Single(name)
        // }
        // return this.instance
        if (!Single.instance) {
            Single.instance = new Single(name);
        }
        return Single.instance;
    };
    return Single;
}());
// const single = new Single() //报错，因为 constructor 是私有的，类外无法访问。
var single = Single.getInstance('danli');
console.log(single.name);
// 上面 ts 转为 js 的单例返回了构造函数，虽然调用 Single.getInstance 返回的实例都是相同的，但是依然可以在外面使用 new 构造新的实例。
// 所以 ES5 单例模式更好的方式应该是
// var SingletonA = (function () {
//   // var instance = null 
//   function Single() {
//     this.init()
//   }
//   Single.prototype.init = function () {
//     this.data = 'SingletonA'
//   }
//   return function () {
//     // if (instance == null) {
//     if (Single.instance == null)
//       Single.instance = new Single()
//     }
//     return Single.instance
// })()
// var b = SingletonA()
// var c = SingletonA()
// console.log(b === c)
// console.log(b.data)
// 不返回构造函数，而是返回 获取实例的方法

// // 注1
// class Demo {
//   static getThis() {
//     return this
//   }
// }
// 上面代码等于下面代码
function Demo() { }
Demo.getThis = function () {
    return this;
};
