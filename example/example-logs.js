module.exports = function exampleLogs(opts) {
    var bunyan = require('bunyan');
    var bformat = require('../');
    var formatOut = bformat(opts);

    var log = bunyan.createLogger({ name: 'app', stream: formatOut, level: 'debug' } );

    log.info('starting up');
    log.debug({ temperature: 80, status: { started: 'yes', overheated: 'no' } }, 'things are heating up');
    log.warn({ temperature: 120 }, 'getting a bit hot');
    log.error(new Error('temperature: 200'), 'OOOOHHH it burns!');
    log.fatal('I died! Do you know what that means???');

}
