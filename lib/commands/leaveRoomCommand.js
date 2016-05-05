'use strict';

module.exports = class LeaveRoomCommand {
    constructor(chatClient) {
        this._chatClient = chatClient;
        this.name = 'leave';
    }
    
    execute() {
        this._chatClient.leaveRoom();
    }
};