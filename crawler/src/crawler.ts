// node 模块
import path from 'path'
// node 模块
import fs from 'fs'
// ts文件直接引用js文件会有问题，需要翻译文件，一般都是叫做 .d.ts 结尾的文件,这里需要安装 @types/superagent
// superagent 可以当做是一个 axios 一样的发请求的工具，但是可以爬取到渲染的内容
import superagent from 'superagent'

import { DellAnalyzer } from './dellAnalyzer'
import { LeeAnalyzer } from './leeAnalyzer'

export interface Analyzer {
  url: string,
  analyze: (html: string, filePath: string) => string
}
/**
 * @description 爬虫类，只关心存取数据，不关心分析数据，这样的好处在于如果想要再爬取别的网页，
 *              就只需要再写一个类似 DellAnalyzer 这样的分析数据的文件就行。
 */
class Crawler {
  private filePath = path.resolve(__dirname, '../data/course.json')
  private url = '' 
  constructor(private analyzer: Analyzer) {
    this.url = analyzer.url
    this.initSpiderProcess()
  }
  private async getRawHtml() {
    const result = await superagent.get(this.url)
    return result.text
  }

  private async initSpiderProcess() {
    const html = await this.getRawHtml()
    const fileContent = this.analyzer.analyze(html, this.filePath)
    this.writeFile(fileContent)
  }
  private writeFile(content: string) {
    fs.writeFileSync(this.filePath, content)
  }
}

const dellAnalyzer = DellAnalyzer.getInstance()
const leeAnalyzer = new LeeAnalyzer()
new Crawler(dellAnalyzer)

// package.json 里 tsc -w -w的意思是感知源码变化并能够重新编译
console.log(123)
// nodemon 检测 js文件的变化，重新运行js文件(不支持ts文件，但是可以配置)

// 这里使用 tsc -w 来检测 ts 代码变化生成 js 文件，再通过 nodemon 来运行 js 文件，来智能运行代码

// 使用 concurrently 来并行运行代码  concurrently npm run dev:build & dev:start
// npm:dev:* 第一个冒号可以理解为 "run" => npm run dev:*
// 使用上述工具是 用 ts 开发 node 的常用方法