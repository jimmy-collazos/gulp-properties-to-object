const parseProperties = require('./lib/parse.js');
const through = require('through2');
const gutil = require('gulp-util');

function createError(err) {
  return new gutil.PluginError({
    plugin: 'gulp-properties-to-object',
    message: err
  });
}

function gulpi18n(db = {}) {
  return through.obj(function(file, enc, cb) {
    if (file.isNull()) {
      cb(null, file);
      return;
    }

    if (file.isStream()) {
      //@see https://nodejs.org/api/buffer.html#buffer_buf_indexof_value_byteoffset_encoding
      //@see http://stackoverflow.com/questions/12121775/convert-streamed-buffers-to-utf8-string
      file.contents.on('data', function (chunk) {
        parseProperties.parse(chunk, db);
      });
    }

    if (file.isBuffer()) {
      parseProperties.parse(file.contents, db);
    }
    cb(null, file);
  });
}

module.exports = gulpi18n;
