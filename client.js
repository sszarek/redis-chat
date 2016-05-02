const readline = require('readline');
const Redis = require('redis-fast-driver');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const redis = new Redis({
    host: '127.0.0.1',
    port: 6379
});

const CommandRgxp = /^\/(\w+) (\w+)$/g;

redis.on('ready', function () {
    rl.write('redis connected\n');
});

redis.on('error', function (e) {
    rl.write('redis error\n', e);
});

rl.on('line', function (line) {
    let result = CommandRgxp.exec(line);
    if (result) {
        let command = result[1];
        let room = result[2];

        joinRoom(room);
    }
});

function joinRoom(room) {
    redis.rawCall(['SUBSCRIBE', room], function (e, data) {
        console.log(data);
        // if (data) {
        //     rl.write(data);
        // }

        //rl.write(data);
    });
}

// ld.prompt()

// var r2 = new Redis({
//     host: '127.0.0.1',
//     port: 6379
// });

// setInterval(function () {
//     r2.rawCall(['PUBLISH', 'foo', 'bar']);
// }, 1000);

// setInterval(function () {
//     r2.rawCall(['PUBLISH', 'foo2', 'bar2']);
// }, 3000);