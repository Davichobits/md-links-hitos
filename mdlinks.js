const path = require('path');
const fs = require('fs');
const fsPromises = require('fs/promises');

const { foundLinks, validateLink } = require('./functions.js');

const mdLinks = (userPath, validate) => {
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
          const linksArray = foundLinks(data); // return text and url
          if(validate){

            const newLinks = linksArray.map(link => {
              return new Promise((resolve, reject) => {
                validateLink(link.url)
                .then((response) => {
                  link.file = userPathAbsolute;
                  link.status = response.status;
                  link.ok = response.ok;
                  
                  resolve(link)
                })
                .catch((error) => {
                  reject(error)
                });
              });
            });
            (Promise.all(newLinks).then((values) => {
              resolve(values)
            }).catch((error) => {}));

          }else{
            linksArray.forEach(link => {
              link.file = userPathAbsolute;
            });
            resolve(linksArray);
          }
          

          
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