const { mdLinks } = require('../mdlinks.js');


describe('test for the mdLinks function', () => {

  it('should be a function', () => {
    expect(typeof mdLinks).toBe('function');
  });

  it('should return an error if the path doesnt exist', () => {
    expect(()=> mdLinks()).rejects.toThrowError('El path no fue proporcionado.');

  });

  it('should return an array of links', () => {
    const output =[
      {
        text: 'Markdown',
        url: 'https://es.wikipedia.org/wiki/Markdown',
        file: './folder/archivo.md'
      },
      {
        text: 'Node.js',
        url: 'https://nodejs.org/',
        file: './folder/archivo.md'
      }
    ]
    return mdLinks('./folder/archivo.md').then(data => {
      expect(data).toEqual(output)
    })
  });

  it('should resolve a promise', () => {
    expect(mdLinks('./folder/archivo.md')).toBeInstanceOf(Promise);
  });
});