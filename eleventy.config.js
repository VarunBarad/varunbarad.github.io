module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("_eleventy/favicon.png");
  eleventyConfig.addPassthroughCopy("_eleventy/assets");
  eleventyConfig.addPassthroughCopy("_eleventy/podcasts");
  
  eleventyConfig.addCollection('categories', function(collectionApi) {
    let categories = new Set();
    let posts = collectionApi.getFilteredByTag('post');
    posts.flatMap(post => post.data.categories).forEach((category) => {
      categories.add(category);
    });
    return Array.from(categories);
  });
  
  return {
    dir: {
      layouts: "_layouts",
      includes: "_includes",
      input: "_eleventy",
      output: "_eleventy/_site",
    },
  };
};
