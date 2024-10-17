module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("_eleventy/favicon.png");
  eleventyConfig.addPassthroughCopy("_eleventy/assets");
  eleventyConfig.addPassthroughCopy("_eleventy/podcasts");
  
  eleventyConfig.addCollection('blogPostCategories', function(collectionApi) {
    const categoryNames = new Set();
    const posts = collectionApi.getFilteredByTag('post');
    posts.flatMap(post => post.data.categories).forEach((category) => {
      categoryNames.add(category);
    });
    const categories = Array.from(categoryNames).map(categoryName => {
      return {
        name: categoryName,
        posts: posts.filter(post => post.data.categories.includes(categoryName)),
      };
    });
    return categories.toSorted((a, b) => a.name.localeCompare(b.name));
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
