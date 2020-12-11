const fs = require('fs');
const util = require('util');
const readAsync = util.promisify(fs.readFile);

class Work {
    constructor(file) {
            this.file = file;
            this.plan = []; // 建立的工人完成工作的时间表
            this.len = 0; // 工作或者工人的数量
            this.bestTime = Number.MAX_VALUE; // 最短时间
            this.workQueue = []; // 对每个工人安排的工作
            this.totalTime = 0; // 当前安排工作总时间
            this.bestQueue = []; // 最优工作序列
        }
        /**
         * 读取文本内容
         * @param {string} file 要读入文本的路径
         */
    async getInputData(file) {
            return await readAsync(file, 'utf-8');
        }
        /**
         * 建立一个二维数组, Arr[i][j]表示第i个工人完成第j项工作所用的时间
         * @param {string} data 文本内容
         */
    buildPlan(data) {
            data.split("\n").forEach(elem => {
                this.plan.push(elem.split(","));
                this.workQueue.push(0);
            })
            this.len = this.plan.length;
        }
        /**
         * 
         * @param {number} i 对i个工作进行安排
         */
    backtrack(i) {
            let { len, workQueue, plan } = this;
            if (i == len) {
                this.bestTime = this.totalTime;
                this.bestQueue = [];
                this.workQueue.forEach(elem => {
                    this.bestQueue.push(elem);
                })
                return;
            } else {
                for (let j = 0; j < len; j++) {
                    // 如果当前工人没有安排工作
                    if (!workQueue[j]) {
                        workQueue[j] = i + 1; // 安排第j个工人第i个工作
                        this.totalTime += Number(plan[j][i]);
                        if (this.totalTime < this.bestTime) {  // 界限函数，剪枝
                            this.backtrack(i + 1);
                        }
                        workQueue[j] = 0; // 遍历右节点
                        this.totalTime -= Number(plan[j][i]);
                    }
                }
            }
        }
        /**
         * 调用入口
         */
    async getResult() {
        let data = await this.getInputData(this.file);
        this.buildPlan(data);
        this.backtrack(0);
        console.log(`${this.len}个工人分配的任务序列是:${this.bestQueue.join(",")}`)
        console.log(`最短时间为:${this.bestTime}`);
    }
}
const work = new Work(`./input_assign04_01.txt`);
work.getResult();