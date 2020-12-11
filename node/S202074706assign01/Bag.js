const fs = require('fs');
const util = require('util');
const readAsync = util.promisify(fs.readFile);
/**
 * 读取文件内容
 * @param {string} file 要读取的文件目录
 * @param {string} data 返回读取的数据
 */
async function getInputData(file) {
    return await readAsync(file, 'utf-8');
}
/**
 * 创建背包类
 */
class Bag {
    constructor(weightTxt, valueTxt, totalTxt) {
        this.weightTxt = weightTxt;
        this.valueTxt = valueTxt;
        this.totalTxt = totalTxt;
    }
    async getResult() {
        // 初始化赋值
        let weight = (await getInputData(this.weightTxt)).split(",").map(elem => Number(elem));
        let value = (await getInputData(this.valueTxt)).split(",").map(elem => Number(elem));
        let total = parseInt(await getInputData(this.totalTxt));
        // 初始化最优解表格
        let nums = weight.length, graph = [], list = [];
        for (let i = 0; i <= nums; i++) {
            // 背包重量为0的时候，总价值一定为0
            graph[i] = [];
            graph[i][0] = 0;
            for (let j = 0; j <= total; j++) {
                // 0个物品的时候，总价值一定为0
                graph[0][j] = 0;
            }
        }
        // 开始构建价值表
        for (let i = 1; i <= total; i++) {
            for (let j = 1; j <= nums; j++) {
                // 如果当前物品超过背包的总容量
                if (weight[j - 1] > i) {
                    graph[j][i] = graph[j - 1][i];
                } else {
                    // 当前物品没有超过背包的总容量
                    graph[j][i] = Math.max(graph[j - 1][i], graph[j - 1][i - weight[j - 1]] + value[j - 1]);
                }
            }
        }
        // 求装入的物品类型
        let leave = total;
        for (let i = nums; i > 0; i--) {
            // 表明第i个物品装入了背包
            if (graph[i][leave] > graph[i - 1][leave]) {
                list.push(i);
                leave = leave - weight[i - 1];
            }
        }
        return {
            total: graph[nums][total],
            list,
        };
    }
}
const inputs = [
    `${__dirname}/input_assign02_01.txt`,  // 重量
    `${__dirname}/input_assign02_02.txt`,  // 价值
    `${__dirname}/input_assign02_03.txt`,  // 背包总量
];
// 背包实例
const bag = new Bag(...inputs);
bag.getResult().then(data => {
    console.log("装入的总价值是", data.total)
    console.log("装入的物品是:", data.list.reverse().join(','));
});


