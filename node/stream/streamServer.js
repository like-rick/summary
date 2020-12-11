const http = require('http');
const fs = require('fs');
http.createServer((req, res) => {
    fs.createReadStream(`${__dirname}/index.html`).pipe(res);
}).listen(8000);