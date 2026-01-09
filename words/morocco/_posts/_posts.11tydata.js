function parseDateFromFileSlug(fileSlug) {
  const match = fileSlug.match(/^(\d{4})-(\d{2})-(\d{2})-/);
  if (!match) return null;
  const [_, year, month, day] = match;
  return new Date(`${year}-${month}-${day}T00:00:00.000Z`);
}

function stripDatePrefix(fileSlug) {
  return fileSlug.replace(/^\d{4}-\d{2}-\d{2}-/, "");
}

module.exports = {
  tags: ["posts"],
  eleventyComputed: {
    date: (data) => parseDateFromFileSlug(data.page.fileSlug) ?? data.page.date,
    permalink: (data) => `/words/${stripDatePrefix(data.page.fileSlug)}.html`,
  },
};
