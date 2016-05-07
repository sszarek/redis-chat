const readline = require('readline');
const EventEmitter = require('events').EventEmitter;

class Console extends EventEmitter {
    constructor(inStream, outStream) {
        super();
        
        this._outStream = outStream;
        this._rl = readline.createInterface({
            input: inStream,
            output: outStream
        });
        this._rl.on('line', line => this.emit('line', line));
    }
    
    writeLine(text) {
        this._outStream.write(`${text}\n`);
    }
}

module.exports = new Console(process.stdin, process.stdout);