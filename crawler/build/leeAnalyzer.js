"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @description 举例，另一个分析类，分析不同的数据就要建立不同的分析类
 */
var LeeAnalyzer = /** @class */ (function () {
    function LeeAnalyzer() {
        this.secret = 'x3b174jsx';
        this.url = "http://www.dell-lee.com/typescript/demo.html?secret=" + this.secret;
    }
    LeeAnalyzer.prototype.analyze = function (html, filePath) {
        return html;
    };
    return LeeAnalyzer;
}());
exports.LeeAnalyzer = LeeAnalyzer;
