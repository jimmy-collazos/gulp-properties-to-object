# gulp-properties-to-object

Parse properties files and save in Object

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

- [x] Stream support
- [ ] export JSON
- [ ] join all JSONs in one file
- [ ] add benchmark
- [ ] Add this project in NPM
- [ ] Add Travis
- [ ] Add to Coveralls.io
- [ ] Add to Depstat

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)
