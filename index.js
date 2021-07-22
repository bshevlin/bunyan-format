'use strict';

var stream = require('stream');
var util = require('util');
var formatRecord = require('./lib/format-record');
var xtend = require('xtend');


var Writable = stream.Writable;

module.exports = BunyanFormatWritable;

util.inherits(BunyanFormatWritable, Writable);

/**
 * @typedef BunyanFormatOptions
 * @type {object}
 * @property {string} outputMode - short|long|simple|json|bunyan|short-with-json|long-with-json
 * @property {boolean} [color=false] - toggles colors in output
 * @property {object} [colorFromLevel] - allows overriding log level colors.
 */

/**
 * Creates a writable stream that formats bunyan records written to it.
 *
 * @name BunyanFormatWritable
 * @function
 * @param opts {BunyanFormatOptions} passed to bunyan format function
 * @param {Stream} [out=process.stdout] writable stream to write
 * @return {WritableStream} that you can pipe bunyan output into
 */
function BunyanFormatWritable (opts, out) {
  if (!(this instanceof BunyanFormatWritable)) return new BunyanFormatWritable(opts, out);

  var options = opts || {};
  options.objectMode = true;
  Writable.call(this, options);

  this.opts = xtend({
    outputMode: 'short',
    color: true,
    colorFromLevel: {
      10: 'brightBlack',    // TRACE
      20: 'brightBlack',    // DEBUG
      30: 'green',          // INFO
      40: 'magenta',        // WARN
      50: 'red',            // ERROR
      60: 'brightRed',      // FATAL
    }
  }, options);
  this.out = out || process.stdout;
}

BunyanFormatWritable.prototype._write = function (chunk, encoding, cb) {
  var rec;
  try {
    rec = JSON.parse(chunk);
    this.out.write(formatRecord(rec, this.opts));
  } catch (e) {
    this.out.write(chunk);
  }
  cb();
};
