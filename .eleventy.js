function xmlEscape(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function dateToXmlSchema(value) {
  const date = value instanceof Date ? value : new Date(value);
  return date.toISOString();
}

function readableDate(value) {
  if (!value) return "";
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("javascripts");
  eleventyConfig.addPassthroughCopy("projects/svalbard/assets");
  eleventyConfig.addPassthroughCopy("favicon.ico");
  eleventyConfig.addPassthroughCopy("favicon-16x16.png");
  eleventyConfig.addPassthroughCopy("favicon-32x32.png");

  eleventyConfig.addWatchTarget("./css/styles.scss");
  eleventyConfig.addWatchTarget("./_sass/");

  eleventyConfig.addFilter("xml_escape", xmlEscape);
  eleventyConfig.addFilter("date_to_xmlschema", dateToXmlSchema);
  eleventyConfig.addFilter("readable_date", readableDate);

  eleventyConfig.addCollection("posts", (collectionApi) => {
    return collectionApi
      .getFilteredByTag("posts")
      .sort((a, b) => b.date - a.date);
  });

  return {
    dir: {
      input: ".",
      includes: "_includes",
      layouts: "_layouts",
      data: "_data",
      output: "_site",
    },
    htmlTemplateEngine: "liquid",
    markdownTemplateEngine: "liquid",
    templateFormats: ["html", "md", "liquid", "xml", "11ty.js"],
  };
};
