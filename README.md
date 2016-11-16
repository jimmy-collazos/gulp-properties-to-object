# gulp-properties-to-object
[![Build Status](https://travis-ci.org/jimmy-collazos/gulp-properties-to-object.svg?branch=master)](https://travis-ci.org/jimmy-collazos/gulp-properties-to-object)


Parse properties files and save in memory(object)

## Install

```shell
npm install  gulp-properties-to-object
```

## Usage

```javascript
const toObject = require("gulp-properties-to-object");
var db = {};

gulp.src("./src/*.properties")
    .pipe(toObject(db))
    .on('finish', function () {
      console.log('__FINISH__', db);
    });
```

## TODO

- [x] Trim spaces
- [x] Stream support
- [ ] Export JSON
- [ ] Add benchmark
- [ ] Add Travis
- [ ] Add to Coveralls.io
- [ ] Add to Depstat

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)
