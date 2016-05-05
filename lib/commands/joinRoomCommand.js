'use strict';

module.exports = class JoinRoomCommand {
    constructor(chatClient) {
        this._chatClient = chatClient;
        this.name = 'join';
    }

    execute(room) {
        this._chatClient.joinRoom(room);
    }
};