module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("_eleventy/favicon.png");
  eleventyConfig.addPassthroughCopy("_eleventy/podcasts");
  
  return {
    dir: {
      layouts: "_layouts",
      includes: "_includes",
      input: "_eleventy",
      output: "_eleventy/_site",
    },
  };
};
