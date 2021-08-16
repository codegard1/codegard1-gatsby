const http = require('https');
const sizeOf = require('image-size');
const request = require('request');
const fs = require('fs');

// Public url prefix for images store in Azure
const blobStorageBaseUrl = `https://gadzooks.blob.core.windows.net/instagram/`;

// JSON file path 
const filePath = "src/data/instagram_posts.json"
const filePath1 = "src/data/instagram_posts1.json"

// Read synchronously from JSON
const content = fs.readFileSync(filePath);

// Parse as JSON
const jsonContent = JSON.parse(content);

// filter out non-applicable files
const filtered = jsonContent.filter(i => {
  const item = i.media[0];
  const uri = item.uri;
  const uriLength = uri.length;

  return uri.substr(uriLength - 3, 3) === "jpg";
});

// Map to promise array
const output = filtered.map(i => {
  const item = i.media[0];
  const uri = blobStorageBaseUrl + item.uri;

  return new Promise((resolve, reject) => {
    http.get(uri, response => {
      const chunks = [];
      response
        .on('data', chunk => chunks.push(chunk))
        .on('end', () => {
          const buffer = Buffer.concat(chunks);
          const size = sizeOf(buffer);
          console.log(size);
          resolve({ ...item, ...size, ratio: (size.height / size.width) });
        })
        .on('error', err => reject(err));
    })
  });
});

// Write output to a file
Promise.all(output).then((data) => {
  try {
    fs.writeFileSync(filePath1, JSON.stringify(data));
  } catch (err) { console.log(err); }
});
