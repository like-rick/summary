// 实现一个可写流
const { Writable } = require('stream');
class MyWriteStream extends Writable {
    _write(chunk, encoding, cb) {
        console.log(chunk.toString())
        // cb();
    }
}
process.stdin.pipe(new MyWriteStream());