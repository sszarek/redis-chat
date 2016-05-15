'use strict';

const EventEmitter = require('events');
const Redis = require('redis-fast-driver');

module.exports = class ChatClient extends EventEmitter {
    constructor(host, port) {
        super();

        this._subscribeConnection = null;
        this._publishConnection = null;
        this._connectionParams = {
            host: host,
            port: port
        };

        this._currentRoom = null;
        this._userName = 'Anonymous';
    }

    connect() {
        this._subscribeConnection = new Redis(this._connectionParams);
        this._subscribeConnection.on('error', (err) => this.emit('error', err));

        this._publishConnection = new Redis(this._connectionParams);
        this._publishConnection.on('error', (err) => this.emit('error', err));
    }

    joinRoom(room) {
        this._currentRoom = room;
        this._subscribeConnection.rawCall(['SUBSCRIBE', room], (err, data) => {
            if (err) {
                return this.emit('error', err);
            }

            if (data[0] === 'subscribe') {
                this.emit('info', data);
            }

            if (data[0] === 'message') {
                this.emit('message', JSON.parse(data[2]));
            }
        });
    }

    leaveRoom() {
        this._subscribeConnection.rawCall(['UNSUBSCRIBE', this._currentRoom], (err, data) => {
            this.emit('info', data);
        });

        this._currentRoom = null;
    }

    sendMessage(message) {
        if (this._currentRoom) {
            this._publishConnection.rawCall(['PUBLISH', this._currentRoom, JSON.stringify({ user: this._userName, message })]);
        } else {
            this.emit('error', 'Cannot send message while not connected to any room.');
        }
    }

    setUserName(name) {
        if (!name || name.length === 0) {
            throw new Error('Name cannot be empty.');
        }
        this._userName = name;
    }
};