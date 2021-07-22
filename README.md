# @bshevlin/bunyan-format

Writable stream that formats bunyan records that are piped into it

```js
var bunyan = require('bunyan');
var bformat = require('@bshevlin/bunyan-format');
var formatOut = bformat({ outputMode: 'short-with-json' });

var log = bunyan.createLogger({ name: 'app', stream: formatOut, level: 'debug' } );

log.info('starting up');
log.debug({ temperature: 80, status: { started: 'yes', overheated: 'no' } }, 'things are heating up');
log.warn({ temperature: 120 }, 'getting a bit hot');
log.error(new Error('temperature: 200'), 'OOOOHHH it burns!');
log.fatal('I died! Do you know what that means???');
```

* Printing the level in String representation for Json objects

```js
var formatOut = bformat({ outputMode: 'bunyan', levelInString: true });
```

The output would use the string levels:

```
$ node example/json-string-level.js 
{"name":"app","hostname":"ubuntu","pid":28081,"level":"INFO","msg":"starting up","time":"2014-12-01T19:41:29.136Z","v":0}
{"name":"app","hostname":"ubuntu","pid":28081,"level":"DEBUG","msg":"things are heating up { temperature: 80,\n  status: { started: 'yes', overheated: 'no' } }","time":"2014-12-01T19:41:29.142Z","v":0}
{"name":"app","hostname":"ubuntu","pid":28081,"level":"WARN","msg":"getting a bit hot { temperature: 120 }","time":"2014-12-01T19:41:29.143Z","v":0}
{"name":"app","hostname":"ubuntu","pid":28081,"level":"ERROR","msg":"OOOOHHH it burns! [Error: temperature: 200]","time":"2014-12-01T19:41:29.144Z","v":0}
{"name":"app","hostname":"ubuntu","pid":28081,"level":"FATAL","msg":"I died! Do you know what that means???","time":"2014-12-01T19:41:29.144Z","v":0}
```

![demo](https://github.com/bshevlin/bunyan-format/raw/master/assets/bunyan-format-demo.gif)

## Installation

    npm install @bshevlin/bunyan-format

## API

```
/**
 * Creates a writable stream that formats bunyan records written to it.
 *
 * @name BunyanFormatWritable
 * @function
 * @param opts {BunyanFormatOptions} passed to bunyan format function
 * @param {Stream} [out=process.stdout] writable stream to write
 * @return {WritableStream} that you can pipe bunyan output into
 */

 /**
 * @typedef BunyanFormatOptions
 * @type {object}
 * @property {string} outputMode - short|long|simple|json|bunyan|short-with-json|long-with-json
 * @property {boolean} [color=false] - toggles colors in output
 * @property {object} [colorFromLevel] - allows overriding log level colors.
 */
```

## License

MIT
