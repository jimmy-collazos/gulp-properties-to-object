const fs = require('fs');
const gutil = require('gulp-util');
const task = require('../');
const tap = require('tape');

tap.test('read Stream', (childTest) => {
  var stream = task();
  var fileStream = new gutil.File({
    contents: fs.createReadStream('./test/fixtures/smalldemo.properties')
  });
  stream.on('error', childTest.ifError);
  stream.on('finish', () => {
    // burn 'finish' because all is ok
    childTest.ok(true);
    childTest.end();
  });
  stream.write(fileStream);
  stream.end();
});

tap.test('read Buffer', (childTest) => {
  var stream = task();
  var fileStream = new gutil.File({
    contents: new Buffer('')
  });
  stream.on('error', childTest.ifError);
  stream.on('finish', () => {
    // burn 'finish' because all is ok
    childTest.ok(true);
    childTest.end();
  });
  stream.write(fileStream);
  stream.end();
});

tap.test('ignore line commented', (childTest) => {
  var db = {};
  var stream = task(db);
  var fileStream = new gutil.File({
    contents: new Buffer('#key=value')
  });
  // var resultKeys = [ 'INTERVINIENTES',
  //   'CONDICIONES',
  //   'CUENTAABONO',
  //   'CUENTACARGO',
  //   'CUENTAVALORES',
  //   'DOCUMENTACIONYFIRMA',
  //   'FINALIZAR',
  //   'PROPERTY_WITH_SPACE',
  //   'LAST_PROPERTY' ];

  stream.on('error', childTest.ifError);
  stream.on('error', childTest.end);

  stream.on('finish', () => {
    childTest.equal(Object.keys(db).length, 0);
    childTest.end();
  });
  stream.write(fileStream);
  stream.end();
});
tap.test('ignore line without equal character', (childTest) => {
  var db = {};
  var stream = task(db);
  var fileStream = new gutil.File({
    contents: new Buffer('key')
  });

  stream.on('error', childTest.ifError);
  stream.on('error', childTest.end);

  stream.on('finish', () => {
    childTest.equal(Object.keys(db).length, 0);
    childTest.end();
  });
  stream.write(fileStream);
  stream.end();
});

tap.test('ignore line if have one character', (childTest) => {
  var db = {};
  var stream = task(db);
  var fileStream = new gutil.File({
    contents: new Buffer('=')
  });

  stream.on('error', childTest.ifError);
  stream.on('error', childTest.end);

  stream.on('finish', () => {
    childTest.equal(Object.keys(db).length, 0);
    childTest.end();
  });
  stream.write(fileStream);
  stream.end();
});


tap.test('remove initial and ended spaces', (childTest) => {
  var db = {};
  var stream = task(db);
  var fileStream = new gutil.File({
    contents: new Buffer('     attName     =    attValue       ')
  });
  stream.on('error', childTest.ifError);
  stream.on('error', childTest.end);

  stream.on('finish', () => {
    childTest.equal(db.attName, 'attValue');
    childTest.end();
  });
  stream.write(fileStream);
  stream.end();
});
