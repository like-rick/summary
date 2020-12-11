const fs = require('fs');
const downLoadFile = function (src, localFilePath) {
    try {
        const ws = fs.createWriteStream(localFilePath);
        return new Promise((resolve, reject) => {
            ws.on('finish', () => {
                resolve(localFilePath);
            });
            fs.createReadStream(src).pipe(ws);
        })
    } catch (error) {
        
    }
}
downLoadFile("./json-lines.txt", "target.txt").then((target) => {console.log(target)});