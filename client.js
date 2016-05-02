'use strict';

// const readline = require('readline');
// const Redis = require('redis-fast-driver');
// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// });

// const subscribeConnection = new Redis({
//     host: '127.0.0.1',
//     port: 6379
// });

// const publishConnection = new Redis({
//     host: '127.0.0.1',
//     port: 6379
// });

const readline = require('readline');
const ChatClient = require('./lib/chatClient');
const CommandRgxp = /^\/(\w+) (\w+)$/g;

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const client = new ChatClient('127.0.0.1', 6379);
client.connect();

client.on('message', message => console.log(message));

rl.on('line', function (line) {
    let result = CommandRgxp.exec(line);
    if (result) {
        let room = result[2];
        client.joinRoom(room);
    } else {
        client.sendMessage(line);
    }
});