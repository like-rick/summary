const fs = require('fs');
const util = require('util');
const readAsync = util.promisify(fs.readFile);
/**
 * 构造节点数据结构
 */
class Node{
    constructor(left, right, value, tag){
        this.left = left;
        this.right = right;
        this.value = value;
        this.tag = tag;
    }
}
/**
 * 构建哈夫曼编码类
 */
class Huffman {
    constructor(file) {
        this.file = file;
        // 根几点
        this.root = new Node();
        // 字符使用频率
        this.charUse;
        // 叶子节点的路径
        this.leafTrack = {};
    }
    /**
     * 读取文本内容
     * @param {string} file 要读入文本的路径
     */
    async getInputData(file) {
        return await readAsync(file, 'utf-8');
    }
    /**
     * 统计文本内容各个字符出现的频率
     * @param {string} data 文本内容
     */
    getRateNode(data) {
        let dataMap = new Map();
        let nodeList = [];
        // 利用HashMap数据结构的性质统计每一个字符出现的次数
        for (let i = 0; i < data.length; i++) {
            let key = data[i], value = 1;
            if (dataMap.has(key)) {
                value = dataMap.get(key) + 1;
                dataMap.set(key, value);
            } else {
                dataMap.set(key, value);
            }
        }
        this.charUse = dataMap;
        // 转换数据格式为数组的格式，方便遍历
        dataMap.forEach((value, key, map) => {
            nodeList.push({key, value});
            // 初始化叶子节点的路径
            this.leafTrack[key] = "";
        })
        // 从小到大排序,并生成节点
        return nodeList.sort((a,b) => a.value - b.value).map(elem => new Node(null, null, elem.value, elem.key));
    }
    /**
     * 构建哈夫曼树
     * @param {Array} dataList 要构建的数据集
     */
    buildHuffman(dataList) {
        if (dataList.length == 2) {
            // 终止条件是，只剩下两个节点的时候
            let left = dataList[0], right = dataList[1];
            this.root.left = left;
            this.root.right = right;
            this.root.value = left.value + right.value;
            this.root.tag = left.tag + right.tag;
            return this.root;
        } else {
            let left = dataList[0], right = dataList[1];
            let node = new Node(left, right, left.value + right.value, left.tag + right.tag);
            dataList.splice(0, 2, node);
            // 贪心策略,每次都排序都选择最小的两个
            dataList.sort((a,b) => a.value - b.value);
            this.buildHuffman(dataList);
        }
    }
    /**
     * 对构建好的哈夫曼树深度优先搜索
     */
    deepSearch(path, target, node) {
        if (node.tag == target) {
            this.leafTrack[target] = path;
            return;
        }
        if (Array.prototype.findIndex.call(node.left.tag, (elem) => elem == target) != -1) {
            path += '0';
            this.deepSearch(path, target, node.left);
        } else {
            path += '1';
            this.deepSearch(path, target, node.right);
        }  
    }
    /**
     * 创建编码文件
     * @param {string} data 
     */
    createResultFile(data) {
        const createWriteFile = fs.WriteStream('./result.txt');
        let result = '编码格式为:  ';
        for (let i = 0; i < data.length; i++) {
            let char = data[i];
            result += this.leafTrack[char];
        }
        result += '\n';
        result += '字符使用频率为:\n';
        this.charUse.forEach((value, key, map) => {
            // 初始化叶子节点的路径
            result += `${key}: ${value}\n`;
        })
        result += '单个编码格式为:\n';
        for (let key in this.leafTrack) {
            result += `${key}: ${this.leafTrack[key]} \n`;
        }
        createWriteFile.write(result, 'utf-8', () => {
            console.log('写入完成')
        });
    }
    /**
     * 调用入口
     */
    async getResult() {
        let data = await this.getInputData(this.file);
        let nodeList = this.getRateNode(data);
        this.buildHuffman(nodeList);
        for (let key in this.leafTrack) {
            this.deepSearch('', key, this.root);
        }
        this.createResultFile(data);
    }
}
const huffman = new Huffman(`./input_assign03_01.txt`);
huffman.getResult();