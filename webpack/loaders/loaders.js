const loaderUtils= require('loader-utils');
const fs = require('fs');
const { promisify } = require('util')
const read = promisify(fs.readFile);
module.exports = function (source) {
    const options = loaderUtils.getOptions(this);
    const callback = this.async();
    read('./test.txt').then((data) => {
        // if(err) return callback(err);
        console.log(JSON.stringify(data.toString()))
        callback(null, `export default '${data.toString()}'`)
    }).catch(err => {
        callback(err);
    })
    // return;
    // const json = JSON.stringify(source);
    // this.callback(null, `export default ${json}`)
    // return "{a:1}"
}
// module.exports.raw = true