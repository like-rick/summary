const fs = require('fs');
const util = require('util');
const readAsync = util.promisify(fs.readFile);

class Work {
    constructor(file) {
            this.file = file;
            this.plan = []; // 输入的数据第i个公司分配j台机器的盈利
            this.dp = []; // 前i个公司分配j台机器的最大盈利
            this.n = 0; // 有多少个公司
            this.m = 0; // 有多少机器
        }
        /**
         * 读取文本内容
         * @param {string} file 要读入文本的路径
         */
    async getInputData(file) {
            return await readAsync(file, 'utf-8');
        }
        /**–
         * 建立一个二维数组, 第i个公司分配j台机器的盈利
         * @param {string} data 文本内容
         */
    buildPlan(data) {
            data.split("\n").forEach(elem => {
                let d = elem.split(",");
                this.plan.push(d);
                this.m = d.length; // 初始化有几台机器
            })
            this.n = this.plan.length; // 初始化有几个公司
            this.dp = new Array(this.n + 1);
            for (let i = 0; i <= this.n; i++) {
                this.dp[i] = new Array(this.m + 1).fill(0); // 初始化dp矩阵都为0
            }
        }
        /**
         * 调用入口
         */
    async getResult() {
        let data = await this.getInputData(this.file);
        this.buildPlan(data);
        for (let i = 1; i <= this.n; i++) {
            for (let j = 0; j <= this.m; j++){
                for (let k = 0; k <= j; k++) {
                    this.dp[i][j] = Math.max(this.dp[i][j], dp[i - 1][j - k] + this.plan[i][k]);
                }
            }
        }
        return this.dp[n][m];
    }
}
const work = new Work(`./input.txt`);
work.getResult();