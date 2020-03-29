// ts文件直接引用js文件会有问题，需要翻译文件，一般都是叫做 .d.ts 结尾的文件,这里需要安装 @types/superagent
// superagent 可以当做是一个 axios 一样的发请求的工具，但是可以爬取到渲染的内容
import superagent from 'superagent'
// cheerio 可以对 html 进行分析拿到想要的数据 语法类似 jquery
import cheerio from 'cheerio'

interface Course {
  title: string
  count: number
}

class Crawler {
  private secret = 'x3b174jsx'
  private url = `http://www.dell-lee.com/typescript/demo.html?secret=${this.secret}`
  constructor() {
    this.initSpiderProcess()
  }
  async getRawHtml() {
    const result = await superagent.get(this.url)
    return result.text
  }
  getCourseInfo(html: string) {
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
  async initSpiderProcess() {
    const html = await this.getRawHtml()
    const courseResult = this.getCourseInfo(html)
  }
  generateJSONContent() {
    
  }
}

const crawler = new Crawler()
