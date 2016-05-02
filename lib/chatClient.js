'use strict';

const EventEmitter = require('events');
const Redis = require('redis-fast-driver');

module.exports = class ChatClient extends EventEmitter{
    constructor(host, port) {
        super();
        
        this._subscribeConnection = null;
        this._publishConnection = null;
        this._connectionParams = {
            host: host,
            port: port
        };
        
        this._currentRoom = null;
    }

    connect() {
        this._subscribeConnection = new Redis(this._connectionParams);
        this._publishConnection = new Redis(this._connectionParams);
    }
    
    joinRoom(room) {
        this._currentRoom = room;
        this._subscribeConnection.rawCall(['SUBSCRIBE', room], (err, data) => {
            this.emit('message', data);
        });
    }
    
    sendMessage(message) {
        if(!this._currentRoom) {
            throw new Error('Cannot send message while not connected to any room');
        }
        
        this._publishConnection.rawCall(['PUBLISH', this._currentRoom, message]);
    }
};