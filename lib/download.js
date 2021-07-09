const stream = require('stream');
const {promisify} = require('util');
const path = require('path');
const fs = require('fs');
const got = require("got");

const pipeline = promisify(stream.pipeline);

async function download(url, { path: filePath, mode, size }) {
  if (!fs.existsSync(path.dirname(filePath))) {
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
  }
	await pipeline(
		got.stream(url),
		fs.createWriteStream(filePath)
  );
}

module.exports = {
  download,
};
