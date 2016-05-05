'use strict';

const readline = require('readline');
const ChatClient = require('./lib/chatClient');
const Commander = require('./lib/commands/commander');
const JoinRoomCommand = require('./lib/commands/joinRoomCommand');
const LeaveRoomCommand = require('./lib/commands/leaveRoomCommand');
const CommandRgxp = /^\/(\w+)\s*(\w*)$/;

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const commander = new Commander();
const client = new ChatClient('127.0.0.1', 6379);
client.connect();

commander.registerCommand(new JoinRoomCommand(client));
commander.registerCommand(new LeaveRoomCommand(client));

client.on('error', error => console.error(error));
client.on('message', message => console.log(message));

rl.on('line', function (line) {
    let result = CommandRgxp.exec(line);
    if (result) {
        commander.executeCommand(...result.slice(1));
    } else {
        client.sendMessage(line);
    }
});