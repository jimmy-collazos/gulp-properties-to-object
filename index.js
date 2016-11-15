const parseProperties = require('./lib/parse.js');
const through = require('through2');

function index(db = {}) {
  return through.obj(function(file, enc, cb) {
    if (file.isNull()) {
      cb(null, file);
      return;
    }

    if (file.isStream()) {
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

module.exports = index;
