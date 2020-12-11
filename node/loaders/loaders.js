const loaderUtils= require('loader-utils');
const assert = require('assert');
module.exports = function (source) {
    const options = loaderUtils.getOptions(this);
    this.cacheable(false)
    assert(source instanceof Buffer)
    // console.log(options);
    const json = JSON.stringify(source);
    this.callback(null, `export default ${json}`)
    // return "{a:1}"
}
module.exports.raw = true