const EventEmitter = require('events').EventEmitter;

function operation() {
    const events = new EventEmitter();
    process.nextTick(() => {
        events.emit('success', '123');
    })
    return events;
}
operation().on('success', function (string) {
    console.log(string);
})