'use strict';

const assert = require('assert');
const Commander = require('./../lib/commands/commander');

describe('Commander', function () {
    describe('registerCommand', function () {
        let commander = null;

        beforeEach(function () {
            commander = new Commander();
        });

        it('should throw error when name is falsy', function () {
            assert.throws(() => {
                commander.registerCommand(null, () => { });
            });
        });

        it('should throw error when command is not function', function () {
            assert.throws(() => {
                commander.registerCommand('test', {});
            });
        });

        it('should throw error when trying to add command with same twice', function () {
            commander.registerCommand('test', () => { });
            assert.throws(() => {
                commander.registerCommand('test', () => { });
            });
        });

        it('should register command', function () {
            let name = 'test';
            commander.registerCommand(name, () => { });
            
            let commands = commander.commands;
            assert.equal(commands.next().value, name);
        });
    });
});