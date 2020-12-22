const stream = require('stream');
const fs = require('fs');
const util = require('util');


/**
 * 关于可写流：
 * 分为暂停模式(默认)和流动模式
 * 暂停模式需要主动调用子类的_read()方法，_read()方法只会调用一次，直到this.push()，有数据推入内部数据队列（消费队列，缓冲器）时，会自动触发read方法
 * 从暂停模式切换到流动模式有以下几种方法:
 * 1. readStream.pipe(writeStream) // 调用pipe方法
 * 2. readStream.on("data", callback) // 监听data事件
 * 3. 触发resume方法,readStream.resume();
 * 
 * 关于缓冲器：
 * 可写流和可读流都会在内部的缓冲器存储数据，可以分别使用writeable.writeableBuffer或者readable.readableBuffer来获取
 * 可缓冲数据的大小取决于传入流构造函数的highWaterMark选项
 * 
 * // 下面的实例是基于暂停模式实现的
 * 
 */

class JSONLineReader extends stream.Readable {
  constructor(source) {
    super();
    this._source = source;
    this._buffer = '';
    source.on('readable', () => {
      this.read();
      this.pipe(process.stdout);
    });
  }
  // 所有定制 stream.Readable 类都需要实现 _read 方法
  _read(size) {
    let chunk;
    let line;
    let result;
    if (this._buffer.length === 0) {
      chunk = this._source.read();
      this._buffer += chunk;
    }
    const lineIndex = this._buffer.indexOf('\n');
    if (lineIndex !== -1) {
      line = this._buffer.slice(0, lineIndex); // 从 buffer 的开始截取第一行来获取一些文本进行解析
      if (line) {
        result = JSON.parse(line);
        this._buffer = this._buffer.slice(lineIndex + 1);
        // this.emit('123', result); // 当一个 JSON 记录解析出来的时候，触发一个 object 事件
        console.log(result,"test")
        this.push(`${util.inspect(result), lineIndex}, list\n`); // 将解析好的 SJON 发回内部队列
      } else {
        this._buffer = this._buffer.slice(1);
      }
    }
  }
}

const input = fs.createReadStream(`./json-lines.txt`, {
  encoding: 'utf8',
});
const jsonLineReader = new JSONLineReader(input); // 创建一个 JSONLineReader 实例，传递一个文件流给它处理
jsonLineReader.on('123', (obj) => {
  console.log('pos:', obj.position, '- letter:', obj.letter, 'test');
});
