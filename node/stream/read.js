// 实现一个可读流
const { Readable } = require('stream');

class InStream extends Readable {
    constructor(start) {
        super()
        this.currentCharCode = start;
    }
    read(size) {
        // console.log(123)
        let self = this;
        // self.push(self === this ? "true" : "false");
        // setInterval(() => {
        //     self.push(self === this ? "true" : "false");
        // }, 2000);
        this.push(String.fromCharCode(this.currentCharCode++));
        console.log(String.fromCharCode(this.currentCharCode++))
    if (this.currentCharCode > 90) {
    //   this.push(null);
    }
    }
}
var ins = new InStream(65);
ins.pipe(process.stdout);
// const inStream = new Readable({
//     read(size) {
//       this.push(String.fromCharCode(this.currentCharCode++));
//       if (this.currentCharCode > 90) {
//         this.push(null);
//       }
//     }
//   });
//   inStream.currentCharCode = 65;
//   inStream.pipe(process.stdout);