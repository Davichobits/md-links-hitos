const fs = require('fs');

const isFile = (path) => {
  return new Promise((resolve, reject) => {
    console.log('funcion isFile ejecutada');
    fs.stat(path, (err, stats) => {
      if (err) {
        reject(err);
        return;
      }
      
      resolve(stats.isFile());
    });
  });
};

const pruebita = (path) => {
  console.log('esto es una pruebita')
  let isFile
  fs.stat(path, (err, stats) => {
    if (err) {
      console.log(err)
      return;
    }
    
    isFile = stats.isFile();
    console.log(isFile)
  });
  console.log('isFile: ', isFile)
};

module.exports = {
  isFile,
  pruebita
};

