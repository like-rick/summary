let { spawn } = require("child_process");
const { pseudoRandomBytes } = require("crypto");
let path = require("path");
// 通过node命令执行sub_process.js文件
let childProcess = spawn("node",['child.js'], {
  cwd: path.resolve(__dirname),
  stdio:['pipe', 'inherit' ,'pipe','ipc'], // 通过流的方式
});
// 子进程读取写入的数据  // IPC的方式进行通讯
childProcess.on('message', function(data){
    console.log(data);
})
childProcess.send('hello, child');


// stdio参数说明
// 0 1 2 表示子进程和父进程共享标准输入、输出、错误(可以在当前进程显示子进程的输出内容)
// pipe(默认) 子进程和父进程之间的通讯只能通过管道的方式
// inherit 默认子进程和父进程之间共享标准输入输出
// IPC 使用IPC的方式进行通讯 fork进程默认使用IPC通讯

// fork, exec, execFile默认都是基于spawn衍生出来的