const fs = require('fs');
const path = require('path');
const fm = require('front-matter');

/**
 * @param {Dirent} file
 * @returns {string}
 */
const getFileContents = (file) => {
	return fs.readFileSync(path.join(file.parentPath, file.name), {
		encoding: 'utf-8',
		flag: 'r',
	});
};

const getPostTags = (file) => {
	const frontMatter = fm(getFileContents(file));
	// console.log('FrontMatter:', frontMatter.attributes);
	return frontMatter.attributes.categories;
};

const main = async () => {
	const x = Array.from(new Set(
		fs.readdirSync('_eleventy/_posts', {withFileTypes: true, recursive: true})
			.filter(entry => entry.isFile())
			.flatMap(postFile => getPostTags(postFile))
	)).toSorted();
	console.log('Main:', x);
};

main()
	.then(() => console.log('Finished updating tags!'))
	.catch((err) => console.error(err));
