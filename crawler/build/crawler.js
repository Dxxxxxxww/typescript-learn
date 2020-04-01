"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// node 模块
var path_1 = __importDefault(require("path"));
// node 模块
var fs_1 = __importDefault(require("fs"));
// ts文件直接引用js文件会有问题，需要翻译文件，一般都是叫做 .d.ts 结尾的文件,这里需要安装 @types/superagent
// superagent 可以当做是一个 axios 一样的发请求的工具，但是可以爬取到渲染的内容
var superagent_1 = __importDefault(require("superagent"));
var dellAnalyzer_1 = require("./dellAnalyzer");
var leeAnalyzer_1 = require("./leeAnalyzer");
/**
 * @description 爬虫类，只关心存取数据，不关心分析数据，这样的好处在于如果想要再爬取别的网页，
 *              就只需要再写一个类似 DellAnalyzer 这样的分析数据的文件就行。
 */
var Crawler = /** @class */ (function () {
    function Crawler(analyzer) {
        this.analyzer = analyzer;
        this.filePath = path_1.default.resolve(__dirname, '../data/course.json');
        this.url = '';
        this.url = analyzer.url;
        this.initSpiderProcess();
    }
    Crawler.prototype.getRawHtml = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, superagent_1.default.get(this.url)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result.text];
                }
            });
        });
    };
    Crawler.prototype.initSpiderProcess = function () {
        return __awaiter(this, void 0, void 0, function () {
            var html, fileContent;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getRawHtml()];
                    case 1:
                        html = _a.sent();
                        fileContent = this.analyzer.analyze(html, this.filePath);
                        this.writeFile(fileContent);
                        return [2 /*return*/];
                }
            });
        });
    };
    Crawler.prototype.writeFile = function (content) {
        fs_1.default.writeFileSync(this.filePath, content);
    };
    return Crawler;
}());
var dellAnalyzer = dellAnalyzer_1.DellAnalyzer.getInstance();
var leeAnalyzer = new leeAnalyzer_1.LeeAnalyzer();
new Crawler(dellAnalyzer);
// package.json 里 tsc -w -w的意思是感知源码变化并能够重新编译
console.log(123);
// nodemon 检测 js文件的变化，重新运行js文件(不支持ts文件，但是可以配置)
// 这里使用 tsc -w 来检测 ts 代码变化生成 js 文件，再通过 nodemon 来运行 js 文件，来智能运行代码
// 使用 concurrently 来并行运行代码  concurrently npm run dev:build & dev:start
// npm:dev:* 第一个冒号可以理解为 "run" => npm run dev:*
// 使用上述工具是 用 ts 开发 node 的常用方法
