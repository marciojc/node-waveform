var path = require('path');
var execFile = require('child_process').execFile;
var waveformBin = path.resolve(__dirname, "build", "Release", "waveform");

var flagNames = {
  'scan': true,
  'wjs-plain': true,
};

module.exports = function(audiofile, options, callback) {
  var cmdline = [audiofile];
  for (var optName in options) {
    if (flagNames[optName]) {
      cmdline.push('--' + optName);
    } else {
      var value = options[optName];
      cmdline.push('--' + optName);
      cmdline.push(value);
    }
  }

  execFile(waveformBin, cmdline, {maxBuffer: 5000*1024}, function(err, stdout, stderr) {
    if (err) {
      err.stdout = stdout;
      err.stderr = stderr;
      err.stack += new Error().stack;
      callback(err);
    } else {
      callback(null, stdout);
    }
  });
};
