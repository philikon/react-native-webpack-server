var http = require('http');
var url = require('url');

function log(message) {
  console.log('\nrnws', new Date().toISOString(), message, '\n');
}

function fetch(uri) {
  log('fetch(' + uri + ')');
  return new Promise((resolve, reject) => {
    var parts = url.parse(uri);
    var buffer = '';
    var handler = res => {
      res.on('data', chunk => {
        buffer += chunk;
      });
      res.on('end', () => {
        log('fetch(' + uri + '): request completed');
        if (res.statusCode === 200) {
          resolve(buffer);
        } else {
          reject(buffer);
        }
      });
    };
    var request = http.request(parts, handler);
    request.setTimeout(0); // Disable any kind of automatic timeout behavior.
    request.end();
  });
}

module.exports = fetch;
