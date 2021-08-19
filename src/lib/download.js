const stream = require('stream');
const {promisify} = require('util');
const path = require('path');
const fs = require('fs');
const got = require("got");

const pipeline = promisify(stream.pipeline);

async function download(url, { path: filePath, mode, size }) {
  if (filePath) {
    if (!fs.existsSync(path.dirname(filePath))) {
      fs.mkdirSync(path.dirname(filePath), { recursive: true });
    }
    await pipeline(
      got.stream(url),
      fs.createWriteStream(filePath)
    );
  } else {
    const res = await got.get(url);
    return res.body;
  }
}

module.exports = {
  download,
};
