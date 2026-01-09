module.exports = {
  eleventyComputed: {
    permalink: (data) => `${data.page.filePathStem}.html`,
  },
};

