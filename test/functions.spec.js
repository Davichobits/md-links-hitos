const axios = require('axios');
const { foundLinks, validateLink } = require("../functions")

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

jest.mock('axios');

describe('test for the validateLink function', () => {

  it('should be a function', ()=>{
    expect(typeof validateLink).toBe('function');
  })

  it('should throw and error if the input is not a string', ()=>{
    expect(()=>validateLink(123)).toThrowError('link no valido');
  })

  afterEach(()=>{
    jest.clearAllMocks();
  });

  it('should return a correct answer when the link is valid', ()=>{
    const mockResponse = {
      status: 200,
      statusText: 'OK'
    }
    axios.get.mockResolvedValue(mockResponse)
    const link = 'https://www.google.com'
    return validateLink(link)
    .then(res=>{
      expect(axios.get).toHaveBeenCalledWith(link);
      expect(res).toEqual({
        status: mockResponse.status,
        ok: mockResponse.statusText,
      });
    });
  });

});