const path = require('path');
const fs = require('fs');
const fsPromises = require('fs/promises');

const { foundLinks } = require('./functions.js');

const mdLinks = (userPath) => {
  return new Promise((resolve, reject) => {
    
    // Comprobar que se haya pasado una ruta
    if (userPath === undefined) {
      reject(new Error('El path no fue proporcionado.'));
      return;
    }

    // transformar la ruta a absoluta en caso de que no lo sea
    let userPathAbsolute = userPath;
    if(!path.isAbsolute(userPath)){
      userPathAbsolute = path.resolve(userPath)
    }

    // Comprobar si la ruta existe en el computador
    fsPromises.access(userPathAbsolute)
    .then(() => fs.promises.stat(userPathAbsolute)) // Devuelve si la ruta es una archivo
    .then(stats => {
      if(stats.isFile() && path.extname(userPathAbsolute) === '.md'){
        // Leer los links de el archivo
        fs.readFile(userPathAbsolute, 'utf8', (err, data) => {
          if (err) {
            console.error(err)
            return
          }
          // devuelve los enlaces encontrados
          resolve(foundLinks(data));
        })
      }else{
        reject('Es una carpeta')
      }
    })
    .catch(error => reject(error))
  });
}

module.exports = {
  mdLinks
}