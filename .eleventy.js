const { DateTime } = require("luxon")
const htmlmin = require("html-minifier");

const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");

module.exports = function(eleventyConfig) {
    eleventyConfig.addPlugin(eleventyNavigationPlugin)

    eleventyConfig.addPassthroughCopy('src/assets');
    eleventyConfig.addWatchTarget("src/assets");

    eleventyConfig.addFilter('dateReadable', date => {
      return DateTime.fromJSDate(date).toLocaleString(DateTime.DATE_MED)
    });

    eleventyConfig.addPairedShortcode("container", function(content) {
      return `<div class="container">
      
      ${content}
      
      </div>
      `;
    });

    eleventyConfig.addPairedShortcode("section", function(content) {
      return `<div class="section">
      
      ${content}
      
      </div>
      `;
    });

    eleventyConfig.addTransform("htmlmin", function(content) {
      // Prior to Eleventy 2.0: use this.outputPath instead
      if( this.page.outputPath && this.page.outputPath.endsWith(".html") ) {
        let minified = htmlmin.minify(content, {
          useShortDoctype: true,
          removeComments: true,
          collapseWhitespace: true
        });
        return minified;
      }
  
      return content;
    });
      
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
