const { mdLinks } = require('./mdlinks.js')

mdLinks('./folder/archivo.md', true)
.then(result => console.log(result))
.catch(error => console.log(error))

