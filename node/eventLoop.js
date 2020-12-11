// https://mp.weixin.qq.com/s/VZwAZcmAJGWeWrqRbiveaw

/*
setTimeout(() => {
    process.stdout.write('setTimeout \n');
}, 0);
setImmediate(() => {
    process.stdout.write('setImmedidate \n');
})
let start = Date.now();
while(Date.now() - start < 30){}
*/
//

const fs = require('fs');
fs.readFile('./target.txt', (err, data) => {
    setTimeout(() => {
        process.stdout.write('setTimeout \n')
    }, 0);
    setImmediate(() => {
        process.stdout.write('setImmediate \n');
    })
})