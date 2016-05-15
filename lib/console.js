const readline = require('readline');
const EventEmitter = require('events').EventEmitter;

class Console extends EventEmitter {
    constructor(inStream, outStream) {
        super();

        this._outStream = outStream;
        this._rl = readline.createInterface({
            input: inStream,
            output: outStream,
            terminal: true
        });
        this._rl.on('line', line => this.emit('line', line));
        this._currentPosition = 0;
        this._clearScreen();
    }

    _clearScreen() {
        readline.cursorTo(this._outStream, 0, 0);
        readline.clearScreenDown(this._outStream);
    }

    _getCols() {
        return this._outStream.columns;
    }

    _getRows() {
        return this._outStream.rows;
    }
    
    _moveToLine(line) {
        readline.cursorTo(this._outStream, 0, line);
    }
    
    _moveToEnd() {
        this._moveToLine(this._getRows());
    }

    writeLine(text) {
        this._moveToLine(this._currentPosition);
        this._outStream.write(`${text}\n`);
        this._currentPosition++;
        this._moveToEnd();
    }
}

module.exports = new Console(process.stdin, process.stdout);