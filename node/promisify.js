const utils = require('util');
const fs = require('fs');
const readAsync = utils.promisify(fs.readFile);
async function init() {
    let data = (await readAsync(`${__dirname}/json.txt`)).toString('utf-8');
    console.log(data);
}
init();