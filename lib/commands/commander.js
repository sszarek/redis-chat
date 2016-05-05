'use strict';

module.exports = class Commander {
    constructor() {
        this._commands = new Map();
    }

    registerCommand(command) {
        if (this._commands.has(command.name)) {
            throw new Error('Command already added.');
        }

        this._commands.set(command.name, command);
    }

    executeCommand(name, arg) {
        if(this._commands.has(name)) {
            this._commands.get(name).execute(arg);
        } else {
            throw new Error(`Command ${name} was not found. Make sure it was registered.`);
        }
    }
};