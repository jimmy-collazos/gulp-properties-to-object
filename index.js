var parseProperties = require("./parse.js"),
  through = require('through2'),
  gutil = require('gulp-util')

function createError(err) {
  return new gutil.PluginError({
    plugin: 'gulp-properties-to-object',
    message: err
  });
}

function gulpi18n(db) {
  return through.obj(function(file, enc, cb) {
    if (file.isNull()) {
      cb(null, file);
      return;
    }

    if (file.isStream()) {
      this.emit('error', createError('Stream content is not supported'));
      // try {
      //   file.contents.on('data', function (buf) {
      //     console.log(buf);
      //   });
      // } catch (err) {
      //   this.emit('error', createError(err));
      // }
    }

    if (file.isBuffer()) {
      parseProperties.parse(file.contents.toString(), db);
      //this.push(file);
    }
    cb(null, file);
  });
}

// Exporting the plugin main function
module.exports = gulpi18n;
