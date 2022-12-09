const { DateTime } = require("luxon")

const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");

module.exports = function(eleventyConfig) {
    eleventyConfig.addPlugin(eleventyNavigationPlugin)

    eleventyConfig.addPassthroughCopy('assets');
    eleventyConfig.addWatchTarget("assets");

    eleventyConfig.addFilter('dateReadable', date => {
      return DateTime.fromJSDate(date).toLocaleString(DateTime.DATE_MED)
    });

    return {
        dir: {
          // ⚠️ These values are both relative to your input directory.
          includes: "_includes",
          layouts: "_layouts",
          output: "docs"
        }
    }
  };
