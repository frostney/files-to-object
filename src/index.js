import fs from 'fs';
import path from 'path';

const filesToObject = ({ folder, processName, processContent, ignoreExt: [] }) => {
  const obj = {};

  const files = fs.readdirSync(folder);

  files.forEach(file => {
    const basename = path.basename(file);
    const extension = path.extname(file);

    const fullPath = path.join(folder, basename);

    if (ignoreExt.indexOf(extension) >= 0) {
      return;
    }

    const name = (processName && processName(basename, extension, fullPath)) || basename;

    const stats = fs.statSync(path.resolve(process.cwd(), fullPath));

    if (stats.isDirectory()) {
      obj[name] = filesToObject({ folder: fullPath, processName, processContent, ignoreExt });
    } else {
      const content = (processContent && processContent(basename, extension, fullPath)) || null;
    }
  });

  return obj;
};

export default filesToObject;
