
var compressor = require('node-minify');

// Using Google Closure
new compressor.minify({
  type: 'gcc',
  fileIn: 'signatures.js',
  fileOut: 'dist/param-signatures-min-gcc.js',
  callback: function(err, min){
    console.log(err);
    //console.log(min);
  }
});
