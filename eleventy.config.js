module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy({
    "_eleventy/favicon.png": "favicon.png",
  });
  eleventyConfig.addPassthroughCopy("_eleventy/podcasts");
  
  return {
    dir: {
      includes: "_includes",
      input: "_eleventy",
      output: "_eleventy/_site",
    },
  };
};
