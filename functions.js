const fs = require('fs');
const axios = require('axios');

const foundLinks = (data, actualFile) => {

  if(typeof data !== 'string'){
    throw new Error('La Data no es correcta');
  }

  const links = [];
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  let match;
  while ((match = linkRegex.exec(data)) !== null) {
    links.push({ 
      text: match[1],
      url: match[2],
      file: actualFile
    });
  }
  return links;
}

const validateLink = (link)=>{
  return axios.get(link)
    .then((response) => {
      return {
        status: response.status,
        ok: response.statusText,
      };
    })
    .catch((error) => {
      throw error;
    });
};

module.exports = {
  foundLinks,
  validateLink
};

