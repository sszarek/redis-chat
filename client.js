'use strict';

const Console = require('./lib/console');
const ChatClient = require('./lib/chatClient');
const Commander = require('./lib/commands/commander');
const CommandRgxp = /^\/(\w+)\s*(\w*)$/;

const commander = new Commander();
const client = new ChatClient('127.0.0.1', 6379);
client.connect();

commander.registerCommand('help', () => {
    Console.writeLine('Available commands:');
    for(var command of commander.commands) {
        Console.writeLine(`/${command}`);
    }
});
commander.registerCommand('join', arg => client.joinRoom(arg));
commander.registerCommand('leave', () => client.leaveRoom());
commander.registerCommand('exit', () => process.exit(0));
commander.executeCommand('help');

client.on('error', error => Console.writeLine(error));
client.on('message', message => Console.writeLine(message));

Console.on('line', function (line) {
    let result = CommandRgxp.exec(line);
    if (result) {
        commander.executeCommand(...result.slice(1));
    } else {
        client.sendMessage(line);
    }
});