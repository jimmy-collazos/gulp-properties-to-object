const NEW_LINE_REGEXP = /\n/g;
function cleanComments(line) {
  line = line.trim()
}
exports.parse = function(string, db) {
  var lines = string.split(/\n/g);
  db = db || {};
  for (var i = 0, len = lines.length, line; i < len; ++i) {
    let line = lines[i].trim();
    if(line === '' || line[0] === '#' || line.length < 3){
      continue;
    }
    let eqIndex = line.indexOf('=');

    if(!~eqIndex){
      continue;
    }
    let key = line.substr(0, eqIndex).trim();
    let value = line.substr(eqIndex + 1).trim();
    if(key && value){
      db[key] = value;
    }
  }
  // lines.map(line => line.trim());
  // lines.filter(line => line[0] === '#');
  // lines.filter(line => line[0] === '');
  // lines.forEach(line => {
  //   var eqIndex = s.indexOf("=");
  //   if(eqIndex < 0) {
  //     return;
  //   }
  //   var key = s.substr(0, eqIndex).trim();
  //   var value = s.substr(eqIndex + 1).trim();
  //   if(key && value){
  //     object[key] = value;
  //   }
  // });
  // string.split(/(\n|\r\n)/).forEach(function(s) {
  //   s = s.trim();
  //   if(!s) {
  //     return;
  //   }
  //   var eqIndex = s.indexOf("=");
  //   if(eqIndex < 0) {
  //     return;
  //   }
  //   var key = s.substr(0, eqIndex).trim();
  //   var value = s.substr(eqIndex + 1).trim();
  //   console.log('>>', key, value);
  //   object[key] = value;
  // });
  return db;
};

exports.stringify = function(object) {
  var strings = [];
  for(var k in object) {
    strings.push(k + "=" + object[k]);
  }
  return strings.join("\n");
};
