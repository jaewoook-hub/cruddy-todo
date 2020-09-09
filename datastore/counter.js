const fs = require('fs');
const path = require('path');
const sprintf = require('sprintf-js').sprintf;

var counter = 0;

// Private helper functions ////////////////////////////////////////////////////

// Zero padded numbers can only be represented as strings.
// If you don't know what a zero-padded number is, read the
// Wikipedia entry on Leading Zeros and check out some of code links:
// https://www.google.com/search?q=what+is+a+zero+padded+number%3F

//"%05d" % 0.1 => "00000"
const zeroPaddedNumber = (num) => {
  return sprintf('%05d', num);
};

const readCounter = (callback) => {
  fs.readFile(exports.counterFile, (err, fileData) => {
    if (err) {
      callback(null, 0);
    } else {
      callback(null, Number(fileData));
    }
  });
};

const writeCounter = (count, callback) => {
  var counterString = zeroPaddedNumber(count);
  fs.writeFile(exports.counterFile, counterString, (err) => {
    if (err) {
      throw ('error writing counter');
    } else {
      callback(null, counterString);
    }
  });
};

// Public API - Fix this function //////////////////////////////////////////////

exports.getNextUniqueId = (err, callback) => {
  if (err) {
    throw err;
  } else {
    readCounter((err, count) => {
      if (err) {
        throw err;
      } else {
        writeCounter(++count, (err, counterString) => {
          if (err) { throw err; } else { callback(counterString); }
        });
      }
    });
  }

  // return id;
  // readCounter is asynchronous, while returning id is synchronous
  // To deal with this, getNextUniqueId should take a callback as an arg
  // (The callback would be writeFile for .create in index.js)
  // And then the callback would be run last
  // Like readCounter(...writeCounter(...callback(id)))
};



// Configuration -- DO NOT MODIFY //////////////////////////////////////////////

exports.counterFile = path.join(__dirname, 'counter.txt');
