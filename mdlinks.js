const path = require('path');
const fs = require('fs');
const fsPromises = require('fs/promises');

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
      if(stats.isFile()){

        if( path.extname(userPathAbsolute) === '.md'){
          // Leer los links de el archivo
          fs.readFile(userPathAbsolute, 'utf8', (err, data) => {
            if (err) {
              console.error(err)
              return
            }
            // Busca los enlaces utilizando la expresión regular
            const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
            const links = [];
            let match;
            while ((match = linkRegex.exec(data)) !== null) {
              const text = match[1];
              const url = match[2];
              links.push({ text, url });
            }

            // Imprime los enlaces encontrados
            resolve(links);
          })


        }
        

      }else{
        console.log('Es una carpeta')
      }
    })
    .catch(error => console.log(error))

  });
}

module.exports = {
  mdLinks
}