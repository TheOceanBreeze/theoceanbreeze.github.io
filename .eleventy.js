const { DateTime } = require("luxon");

const { EleventyRenderPlugin } = require("@11ty/eleventy");
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const EleventyVitePlugin = require("@11ty/eleventy-plugin-vite");

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(EleventyRenderPlugin);
    eleventyConfig.addPlugin(eleventyNavigationPlugin);
    eleventyConfig.addPlugin(EleventyVitePlugin);

    eleventyConfig.addPassthroughCopy('src/assets').addWatchTarget("src/assets");

    eleventyConfig.addFilter('dateReadable', date => {
      return DateTime.fromJSDate(date).toLocaleString(DateTime.DATE_MED)
    });

    eleventyConfig.addPairedShortcode("container", createDivWrapper("container"));

    eleventyConfig.addPairedShortcode("section", createDivWrapper("section"));
    
    function createDivWrapper(className) {
      return function(content) {
        return `<div class="${className}">
        ${content}
        </div>`;
      };
    }
      
    return {
        dir: {
          // ⚠️ These values are both relative to your input directory.
          input: "src",
          includes: "_includes",
          layouts: "_layouts",
          output: "docs"
        }
    }
  };
