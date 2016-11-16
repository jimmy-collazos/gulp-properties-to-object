const Decoder = require('string_decoder').StringDecoder;
const trim = require('./trim').trim;
const DEC_COMMENT_CHART = 35;
const DEC_EQUAL_CHART = 61;
const DEC_NEWLINE_CHART = 10;

var parseLine = exports.parseLine = function(lineBuffer, memo, decoder) {
  // validate if line is comment or size is less to 3 (minimun: 'a=')
  if(lineBuffer[0] === DEC_COMMENT_CHART || lineBuffer.length < 3){
    return memo;
  }
  let equalIndex = lineBuffer.indexOf(DEC_EQUAL_CHART);
  // if don't have "=" character, is invalid.
  if(equalIndex === -1){
    return memo;
  }
  let key = trim(lineBuffer.slice(0, equalIndex));
  let value = trim(lineBuffer.slice(equalIndex + 1));
  // save in memory
  if(key.length){
    memo[decoder.write(key)] = decoder.write(value);
  }
  return memo;
};

exports.parse = function(buffer, memo) {
  var decoder = new Decoder();
  var line = trim(buffer);
  var startIndexLine = 0;
  var endIndexLine = line.indexOf(DEC_NEWLINE_CHART, startIndexLine);

  // is singel line
  if (endIndexLine === -1) {
    return parseLine(line, memo, decoder);
  }

  // is multi line
  while(endIndexLine > -1) {
    line = trim(buffer.slice(startIndexLine, endIndexLine));
    startIndexLine = endIndexLine + 1;
    endIndexLine = buffer.indexOf(DEC_NEWLINE_CHART, startIndexLine);

    parseLine(line, memo, decoder);
  }
  return memo;
};
