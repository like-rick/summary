const cluster = require('cluster');
const { read } = require('fs');
const http = require('http');
const cpuNums = require('os').cpus();
if (cluster.isMaster) {
    for (let index = 0; index < cpuNums.length; index++) {
        cluster.fork();
    }
    cluster.on('exit', function (worker, code, singal) {
        console.log(`工作进程${worker.process.pid}已经退出`);
    })
} else {
    http.createServer((req, res) => {
        res.writeHead(200);
        res.end(`hello ${process.pid}`)
    }).listen(3001);
    console.log(`工作进程${process.pid}开始工作`);

}