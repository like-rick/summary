const fs = require('fs');
const fd = fs.openSync('./test.txt', 'w+');
const fd1 = fs.openSync('./target.txt', 'w+');
console.log(fd)
console.log(fd1)
