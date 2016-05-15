'use strict';

const _ = require('lodash');

module.exports = class Commander {
    constructor() {
        this._commands = new Map();
    }

    registerCommand(name, command) {
        if (!name) {
            throw new Error('Name not provided.');
        }

        if (!_.isFunction(command)) {
            throw new Error('Command is not function.');
        }

        if (this._commands.has(name)) {
            throw new Error('Command already added.');
        }

        this._commands.set(name, command);
    }

    executeCommand(name, arg) {
        if (this._commands.has(name)) {
            this._commands.get(name)(arg);
        } else {
            throw new Error(`Command ${name} was not found. Make sure it was registered.`);
        }
    }

    get commands() {
        return this._commands.keys();
    }
};