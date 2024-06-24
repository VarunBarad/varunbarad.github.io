module.exports = function(eleventyConfig) {
  return {
    dir: {
      includes: "_includes",
      input: "_eleventy",
      output: "_eleventy/_site",
    },
  };
};
