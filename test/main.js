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

describe('test', function () {
  describe('build DB', function () {
    var srcFile = new gutil.File({
          path: path.join(__dirname, './fixtures/messages.titulo.ventanas.properties'),
          cwd: __dirname,
          base: path.join(__dirname, './fixtures/'),
          contents: fs.readFileSync(path.join(__dirname, './fixtures/messages.titulo.ventanas.properties'))
        });

    it('save data in DB', function (done) {
      var db = {};
      var stream = task(db);
      var resultKeys = [ 'INTERVINIENTES',
        'CONDICIONES',
        'CUENTAABONO',
        'CUENTACARGO',
        'CUENTAVALORES',
        'DOCUMENTACIONYFIRMA',
        'FINALIZAR',
        'NEXO_TITULO' ];

      stream.on('error', should.ifError);
      stream.on('error', done);

      stream.on('finish', (data) => {
        assert.deepStrictEqual(Object.keys(db), resultKeys);
        done();
      });
      stream.write(srcFile);
      stream.end();
    });
  });
});
