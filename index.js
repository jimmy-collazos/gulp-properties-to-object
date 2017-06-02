const parse = require('./lib/parse.js');
const through = require('through2');

function index(db = {}) {
  return through.obj((file, enc, cb) => {
    if (file.isNull()) {
      cb(null, file);
      return;
    }

    if (file.isStream()) {
      file.contents.on('data',  (chunk) => parse.multiline(chunk, db));
    } else if (file.isBuffer()) {
      parse.multiline(file.contents, db);
    }

    cb(null, file);
  });
}

module.exports = index;
