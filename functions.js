const fs = require('fs');

const foundLinks = (data) => {
  const links = [];
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  let match;
  while ((match = linkRegex.exec(data)) !== null) {
    const text = match[1];
    const url = match[2];
    links.push({ text, url });
  }
  return links;
}

module.exports = {
  foundLinks,
};

