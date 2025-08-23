const feedPlugin = require('@11ty/eleventy-plugin-rss');
const syntaxHighlightPlugin = require("@11ty/eleventy-plugin-syntaxhighlight");
const { ZonedDateTime, ZoneId, DateTimeFormatter } = require('@js-joda/core');
require('@js-joda/timezone');

module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("favicon.png");
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("podcasts");
  eleventyConfig.addPassthroughCopy("experiments");
  
  eleventyConfig.addNunjucksFilter('dateToRfc3339WithTimezone', (inputDateObj) => {
    return ZonedDateTime.parse(inputDateObj.toISOString())
      .withZoneSameInstant(ZoneId.of('Asia/Kolkata'))
      .format(DateTimeFormatter.ofPattern('yyyy-MM-dd^HH:mm:ssXXX'))
      .replace('^', 'T');
  });
  
  eleventyConfig.addPlugin(feedPlugin, {
    type: 'atom',
    outputPath: '/feed.xml',
    collection: {
      name: 'post',
      limit: '0',
    },
    metadata: {
      language: 'en',
      title: 'Varun Barad - Curious Developer',
      subtitle: 'My online home where I post about new things I learn or find interesting.',
      base: 'https://varunbarad.com/',
      author: {
        name: 'Varun Barad',
      },
    },
  });
  
  eleventyConfig.addPlugin(syntaxHighlightPlugin);
  
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
      input: ".",
      output: "_site",
    },
  };
};
