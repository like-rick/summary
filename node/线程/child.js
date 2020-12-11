process.send("hello, main");
process.on('message', function (data) {
    console.log(data);
})