const readline = require('readline');
const Redis = require('redis-fast-driver');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const subscribeConnection = new Redis({
    host: '127.0.0.1',
    port: 6379
});

const publishConnection = new Redis({
    host: '127.0.0.1',
    port: 6379
});

const CommandRgxp = /^\/(\w+) (\w+)$/g;

let currentRoom = '';

subscribeConnection.on('ready', function () {
    rl.write('Subscribe connection established\n');
});

subscribeConnection.on('error', function (e) {
    rl.write(e);
});

publishConnection.on('ready', function () {
    rl.write('Publish connection established\n');
});

publishConnection.on('error', function (e) {
    rl.write(e);
});

rl.on('line', function (line) {
    let result = CommandRgxp.exec(line);
    if (result) {
        let room = result[2];
        currentRoom = room;
        joinRoom(room);
    } else {
        sendMessage(line);
    }
});

function joinRoom(room) {
    subscribeConnection.rawCall(['SUBSCRIBE', room], function (e, data) {
        console.log(data);
    });
}

function sendMessage(message) {
    publishConnection.rawCall(['PUBLISH', currentRoom, message]);
}