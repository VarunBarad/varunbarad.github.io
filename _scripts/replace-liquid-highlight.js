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

const replaceLiquidHighlight = (postData) => {
  const highlightsReplaced = postData.contents.replace(/{% highlight .+ %}/g, (substring) => {
    const language = substring.slice(13, -3);
    return `\`\`\`${language}`;
  });
  const endHighlightsReplaced = highlightsReplaced.replace(/{% endhighlight %}/g, '```');
  return {
    fileName: postData.fileName,
    contents: endHighlightsReplaced,
  };
};

const main = async () => {
  fs.readdirSync('./_posts', {withFileTypes: true, recursive: false})
    .filter(entry => entry.isFile())
    .map(postFile => extractPostData(postFile))
    .map(postData => replaceLiquidHighlight(postData))
    .forEach(postData => fs.writeFileSync(path.join('./_posts', postData.fileName), postData.contents, {
      encoding: 'utf-8',
      flush: true,
    }));
};

main()
  .then(() => console.log('Finished replacing liquid highlights!'))
  .catch((err) => console.error(err));
