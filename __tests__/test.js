// @flow

import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

const readFile = promisify(fs.readFile);

test('init', async () => {
  const pathToHtml = path.resolve(__dirname, '__fixtures__/index.html');
  const html = await readFile(pathToHtml, 'utf8');
  document.body.innerHTML = html;
});
