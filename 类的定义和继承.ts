class Animal {
	name = 'animal'
	getName() {
		// ():string
		return this.name
	}
}

class Cat extends Animal {
  // name: 'yuyuan' ??
  // getCatName() { // 这样打印出来的竟然是父类的 name
  //   return this.name
  // }
  getCatName() {
    return 'yuyuan'
  }
  // 重写 多态
  getName() {
    // 通过 super 调用父类方法
    return super.getName() + 'YUYUAN'
    return 'YUYUAN'
  }
}

// const cat = new Animal()
const cat = new Cat()
console.log(cat.getCatName())
console.log(cat.getName())
