import { Analyzer } from './crawler'
/**
 * @description 举例，另一个分析类，分析不同的数据就要建立不同的分析类
 */
class LeeAnalyzer implements Analyzer {
  private secret = 'x3b174jsx'
  public url = `http://www.dell-lee.com/typescript/demo.html?secret=${this.secret}`
  public analyze(html: string, filePath: string) {
    return html
  }
}

export { LeeAnalyzer }
