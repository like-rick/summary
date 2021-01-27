const { fork } = require('child_process');
const child = fork('child.js');
child.on('message', m => {
    console.log(m);
})
child.on('exit', function () {
    console.log('return')
})
