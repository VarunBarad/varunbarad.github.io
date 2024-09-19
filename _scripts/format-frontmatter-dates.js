const fs = require('fs');
const path = require('path');

const getFileContents = (file) => {
  return fs.readFileSync(path.join(file.parentPath, file.name), {
    encoding: 'utf8',
    flag: 'r',
  })
};

const extractPostData = (postFile) => {
  return {
    fileName: postFile.name,
    contents: getFileContents(postFile),
  };
};

const formatFrontMatterDates = (postData) => {
  const contentsWithDateFormatted = postData.contents.replace(/date:\s+\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2} \+0530/, (substring) => {
    const parts = substring.split(/\s+/);
    const date = parts[1];
    const time = parts[2];
    const timezone = parts[3];
    return `date: ${date} ${time} ${timezone}`;
  });
  return {
    fileName: postData.fileName,
    contents: contentsWithDateFormatted,
  };
};

const main = async () => {
  fs.readdirSync('./_posts', {withFileTypes: true, recursive: false})
    .filter(entry => entry.isFile())
    .map(postFile => extractPostData(postFile))
    .map(postData => formatFrontMatterDates(postData))
    .forEach(postData => fs.writeFileSync(path.join('./_posts', postData.fileName), postData.contents, {
      encoding: 'utf-8',
      flush: true,
    }));
};

main()
  .then(() => console.log('Finished formatting front-matter dates!'))
  .catch((err) => console.error(err));
