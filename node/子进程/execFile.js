const { execFile } = require('child_process');
execFile('node', ['child.js'], (error, stdout, stderr) => {
    if (error) {
        console.error(`执行的错误: ${error}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
      console.error(`stderr: ${stderr}`);
})