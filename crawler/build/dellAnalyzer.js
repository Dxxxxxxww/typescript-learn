"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// node 模块
var fs_1 = __importDefault(require("fs"));
// cheerio 可以对 html 进行分析拿到想要的数据 语法类似 jquery
var cheerio_1 = __importDefault(require("cheerio"));
/**
 * @description 分析类
 */
var DellAnalyzer = /** @class */ (function () {
    function DellAnalyzer() {
        this.secret = 'x3b174jsx';
        this.url = "http://www.dell-lee.com/typescript/demo.html?secret=" + this.secret;
    }
    DellAnalyzer.prototype.getCourseInfo = function (html) {
        var $ = cheerio_1.default.load(html);
        var courseItems = $('.course-item');
        var courseInfos = [];
        courseItems.map(function (index, element) {
            var descs = $(element).find('.course-desc');
            var title = descs.eq(0).text();
            var count = parseInt(descs
                .eq(1)
                .text()
                .split('：')[1]);
            courseInfos.push({
                title: title,
                count: count
            });
        });
        return {
            time: new Date().getTime(),
            data: courseInfos
        };
    };
    // 一个函数就只有一个功能，这个函数是生成 JSON 的，就不要让它来写入文件了
    DellAnalyzer.prototype.generateJSONContent = function (courseInfo, filePath) {
        var fileContent = {};
        if (fs_1.default.existsSync(filePath)) {
            fileContent = JSON.parse(fs_1.default.readFileSync(filePath, 'utf-8'));
        }
        fileContent[courseInfo.time] = courseInfo.data;
        return fileContent;
    };
    DellAnalyzer.getInstance = function () {
        if (!DellAnalyzer.instance) {
            DellAnalyzer.instance = new DellAnalyzer();
        }
        return DellAnalyzer.instance;
    };
    DellAnalyzer.prototype.analyze = function (html, filePath) {
        var courseInfo = this.getCourseInfo(html);
        var fileContent = this.generateJSONContent(courseInfo, filePath);
        return JSON.stringify(fileContent);
    };
    return DellAnalyzer;
}());
exports.DellAnalyzer = DellAnalyzer;
