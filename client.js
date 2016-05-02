'use strict';

const readline = require('readline');
const ChatClient = require('./lib/chatClient');
const CommandRgxp = /^\/(\w+) (\w+)$/g;

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const client = new ChatClient('127.0.0.1', 6379);
client.connect();

client.on('error', error => console.error(error));
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