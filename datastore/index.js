const fs = require('fs');
const path = require('path');
const _ = require('underscore');
const counter = require('./counter');

var items = {};

// Public API - Fix these CRUD functions ///////////////////////////////////////

exports.create = (text, callback) => {
  counter.getNextUniqueId(null, (id) => {
    fs.writeFile(path.join(exports.dataDir, `${id}.txt`), text, (err) => {
      if (err) {
        throw err;
      } else {
        callback(null, { id, text });
      }
    });
  });

  // items[id] = text;
  // var filename = id + '.txt';
  // fs.writeFile(path.join(exports.dataDir, filename), text, (err) => {
  //   if (err) {
  //     throw err;
  //   }
  // });

  // callback(null, { id, text });
};

exports.readAll = (callback) => {
  // id => filenames
  // text => filenames
  // var data = _.map(items, (text, id) => {
  //   return { id, text };
  // });

  // callback(null, data);

  fs.readdir(exports.dataDir, (err, files) => {
    if (err) {
      throw err;
    } else {
      // ['a', 'b', 'c']
      // change files to array of objects with id and text
      var todos = _.map(files, (file) => {
        return { id: file.substring(0, 5), text: file.substring(0, 5) };
      });
      // call callback with array
      callback(null, todos);
    }
  });
};

exports.readOne = (id, callback) => {
  // var text = items[id];
  // if (!text) {
  //   callback(new Error(`No item with id: ${id}`));
  //   callback(null, { id, text });
  // } else {
  // }

  fs.readFile(path.join(exports.dataDir, `${id}.txt`), 'utf8', (err, text) => {
    if (err) {
      throw err;
    } else {
      callback(null, { id, text });
    }
  });
};

exports.update = (id, text, callback) => {
  // var item = items[id];
  // if (!item) {
  //   callback(new Error(`No item with id: ${id}`));
  // } else {
  //   items[id] = text;
  //   callback(null, { id, text });
  // }

  fs.writeFile(path.join(exports.dataDir, `${id}.txt`), text, (err) => {
    if (err) {
      throw err;
    } else {
      callback(null, { id, text });
    }
  });
};

exports.delete = (id, callback) => {
  // var item = items[id];
  // delete items[id];
  // if (!item) {
  //   // report an error if item not found
  //   callback(new Error(`No item with id: ${id}`));
  // } else {
  //   callback();
  // }

  fs.unlink(path.join(exports.dataDir, `${id}.txt`), (err) => {
    if (err) {
      throw err;
    } else {
      callback();
    }
  });
};

// Config+Initialization code -- DO NOT MODIFY /////////////////////////////////

exports.dataDir = path.join(__dirname, 'data');

exports.initialize = () => {
  if (!fs.existsSync(exports.dataDir)) {
    fs.mkdirSync(exports.dataDir);
  }
};
