const Decoder = require('string_decoder').StringDecoder
const trim = require('./trim').trim;
const DEC_COMMENT_CHART = 35;
const DEC_EQUAL_CHART = 61;
const DEC_NEWLINE_CHART = 10;
exports.parse = function(buffer, memo) {
  var decoder = new Decoder();
  var startIndexLine = 0;
  var endIndexLine = buffer.indexOf(DEC_NEWLINE_CHART, startIndexLine);
  var line, equalIndex, key, value;

  while(!!~endIndexLine) {
    line = trim(buffer.slice(startIndexLine, endIndexLine));
    startIndexLine = endIndexLine+1;//nextline
    endIndexLine = buffer.indexOf(DEC_NEWLINE_CHART, startIndexLine);//nextline
    if(line.length < 3 || line[0] === DEC_COMMENT_CHART){
      continue;
    }
    equalIndex = line.indexOf(DEC_EQUAL_CHART);
    if(!~equalIndex){
      continue;
    }
    key = trim(line.slice(0, equalIndex));
    value = trim(line.slice(equalIndex));
    // save in memory
    if(key.length){
      memo[decoder.write(key)] = decoder.write(value);
    }
  }
  return memo;
};
