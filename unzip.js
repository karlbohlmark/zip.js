var zip = require('./zip.js').zip;

zip.workerScriptsPath = 'karlbohlmark-zip.js/WebContent/';

module.exports = function unzip(blob, cb) {
  getEntries(blob, function (entries) {
    var writer = new zip.BlobWriter();
    var entry = entries[1];
    getEntryFile(entry, cb, function (){

    });
  }, function(e){ alert(e); });
};


module.exports.getEntries = getEntries;
module.exports.getEntryFile = getEntryFile;
module.exports.zip = zip;

function getEntries(file, cb) {
  zip.createReader(new zip.BlobReader(file), function(zipReader) {
    zipReader.getEntries(cb);
  }, onerror);
}

function getEntryFile(entry, onend, onprogress) {
  var writer, zipFileEntry;

  function getData() {
    entry.getData(writer, function(blob) {
      var blobURL = URL.createObjectURL(blob);
      onend(blobURL, function() {
        URL.revokeObjectURL(blobURL);
      });
    }, onprogress);
  }

  writer = new zip.BlobWriter();
  getData();
}