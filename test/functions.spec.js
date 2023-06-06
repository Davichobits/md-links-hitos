const { foundLinks } = require("../functions")

describe('test for the foundLinks function', () => {
  it('should be a function', () => {
    expect(typeof foundLinks).toBe('function');
  });
  
  it('should to throw an error if the data is diferent from an string', () => {
    expect(() => foundLinks([])).toThrowError('La Data no es correcta');
  });

  it('should return an array', () => {
    const data = ` 
    Esto es un archivo md
    [Markdown](https://es.wikipedia.org/wiki/Markdown) 
    [Node.js](https://nodejs.org/)`
    expect(Array.isArray(foundLinks(data))).toBe(true);
  });

});