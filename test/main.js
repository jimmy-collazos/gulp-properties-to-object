/*global describe, it*/
'use strict';

delete require.cache[require.resolve('../')];
require('mocha');
const fs = require('fs');
const should = require('should');
const gutil = require('gulp-util');
const task = require('../');
const assert = require('assert');
const path = require('path');

function getFile(fileReader = fs.readFileSync, fileName = 'smalldemo.properties') {
  let filePath = path.join(__dirname, `./fixtures/${fileName}`);
  let myFile = new gutil.File({
    path: filePath,
    cwd: __dirname,
    base: path.join(__dirname, './fixtures/'),
    contents: fileReader(filePath)
  });
  return myFile;
}

describe('gulp-properties-to-object', () => {
  describe('source type', () => {
    it('buffer', (done) => {
      var stream = task();
      stream.on('error', should.ifError);
      stream.on('error', done);
      stream.on('finish', (data) => {
        // burn 'finish' because all is ok
        assert.ok(true);
        done();
      });
      stream.write(getFile());
      stream.end();
    });
    it('stream', (done) => {
      var stream = task();
      stream.on('error', should.ifError);
      stream.on('error', done);
      stream.on('finish', () => {
        // burn 'finish' because all is ok
        assert.ok(true);
        done();
      });
      //stream.write(getFile(fs.createReadStream, 'messages.contratacion.properties')); //, 'messages.altaclientes.properties'
      stream.write(getFile(fs.createReadStream)); //, 'messages.altaclientes.properties'
      stream.end();
    });
  });

  describe('save in Object', function () {
    it('ignore property comments', function (done) {
      var db = {};
      var stream = task(db);
      var resultKeys = [ 'INTERVINIENTES',
        'CONDICIONES',
        'CUENTAABONO',
        'CUENTACARGO',
        'CUENTAVALORES',
        'DOCUMENTACIONYFIRMA',
        'FINALIZAR',
        'PROPERTY_WITH_SPACE',
        'LAST_PROPERTY' ];

      stream.on('error', should.ifError);
      stream.on('error', done);

      stream.on('finish', (data) => {
        assert.deepStrictEqual(Object.keys(db), resultKeys);
        done();
      });
      stream.write(getFile());
      stream.end();
    });
  });
});
