const SPACE = 32;
var trimStart = exports.trimStart = function (buffer) {
  var total = buffer.length;
  var i = 0;

  if(total === 0){
    return buffer;
  }

  while(buffer[i] === SPACE && i < total) { i++; }

  return buffer.slice(i);
};

var trimEnd = exports.trimEnd = function (buffer) {
  var i = buffer.length - 1;

  if(i === -1){
    return buffer;
  }

  while(buffer[i] === SPACE && i > -1) { i--; }

  return buffer.slice(0, i + 1);
};

exports.trim = function (buffer) {
  return trimEnd(trimStart(buffer));
};
