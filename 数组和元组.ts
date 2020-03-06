// 数组
const arr = [1, '2', 3]
const arr2: (number | string)[] = [1, '2', 3]
const stringArr = ['1', '2']
const stringArr2: string[] = ['1', '2']

type User =
	| { name: string; age: number }
	| { name: string; age: number; msg: string }

class Teacher {
	name: string
	age: number
}

// const objArr: User[] = [{ name: 'dxx', age: 24, msg: 'aa' }]
// ts 不会强制要求每个项必须是 new 出来的
const objArr: Teacher[] = [{ name: 'dxx', age: 24 }, new Teacher()]

// 元组 tuple
// 数组无法约束第几项必须是什么类型，元组可以。且长度固定
// 也就是说当一个数组长度固定，且每一项类型固定，就可以用元组来限制
const teacherInfo: [string, string, number] = ['dxx', 'rich', 25]
const teacherInfo2: { a: string; b: string; c: number }[] = [
	{ a: 'dxx', b: 'rich', c: 25 }
]
// 应用场景： excel csv文件
// dxx, male, 25
// ytt, female, 25

const teacherList: [string, string, number][] = [
	['dxx', 'male', 25],
	['ytt', 'female', 25]
]
