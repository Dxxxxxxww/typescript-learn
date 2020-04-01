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
  async getRawHtml() {
    const result = await superagent.get(this.url)
    return result.text
  }

  async initSpiderProcess() {
    const html = await this.getRawHtml()
    const fileContent = this.analyzer.analyze(html, this.filePath)
    this.writeFile(fileContent)
  }
  writeFile(content: string) {
    fs.writeFileSync(this.filePath, content)
  }
}

const dellAnalyzer = new DellAnalyzer()
const leeAnalyzer = new LeeAnalyzer()
new Crawler(dellAnalyzer)
