// node 模块
import fs from 'fs'
// cheerio 可以对 html 进行分析拿到想要的数据 语法类似 jquery
import cheerio from 'cheerio'

import { Analyzer } from './crawler'

interface Course {
  title: string
  count: number
}

interface CourseResult {
  time: number
  data: Course[]
}

interface Content {
  [propName: number]: Course[]
}
/**
 * @description 分析类
 */
class DellAnalyzer implements Analyzer {
  private static instance: DellAnalyzer
  private secret = 'x3b174jsx'
  public url = `http://www.dell-lee.com/typescript/demo.html?secret=${this.secret}`

  private constructor() {}

  private getCourseInfo(html: string) {
    const $ = cheerio.load(html)
    const courseItems = $('.course-item')
    const courseInfos: Course[] = []
    courseItems.map((index, element) => {
      const descs = $(element).find('.course-desc')
      const title = descs.eq(0).text()
      const count = parseInt(
        descs
          .eq(1)
          .text()
          .split('：')[1]
      )
      courseInfos.push({
        title,
        count
      })
    })
    return {
      time: new Date().getTime(),
      data: courseInfos
    }
  }
  // 一个函数就只有一个功能，这个函数是生成 JSON 的，就不要让它来写入文件了
  private generateJSONContent(courseInfo: CourseResult, filePath: string) {
    let fileContent: Content = {}
    if (fs.existsSync(filePath)) {
      fileContent = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
    }
    fileContent[courseInfo.time] = courseInfo.data
    return fileContent
  }

  public static getInstance() {
    if (!DellAnalyzer.instance) {
      DellAnalyzer.instance = new DellAnalyzer()
    }
    return DellAnalyzer.instance
  }

  public analyze(html: string, filePath: string) {
    const courseInfo = this.getCourseInfo(html)
    const fileContent = this.generateJSONContent(courseInfo, filePath)
    return JSON.stringify(fileContent)
  }
}

export { DellAnalyzer }
