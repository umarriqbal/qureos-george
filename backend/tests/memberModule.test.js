const {
  shortenURL,
  preprocessHeading,
  postprocessHeading,
  tokenizeHeading,
  scrapeWebsiteForHeadings,
} = require("../modules/member");

test("Shortening URL", async () => {
  const shortenedURL = await shortenURL("https://youtube.com");
  expect(shortenedURL).toMatch("https://tinyurl.com/24ra4f");
});

test("Prepocessing of an untokenized heading.", () => {
  const headingText = preprocessHeading(
    "She sells\n\n seashells\t on    the seashore."
  );
  expect(headingText).toMatch("She sells seashells on the seashore.");
});

test("Postprocessing of a heading.", () => {
  const headingText = postprocessHeading(
    "She sells! seashells!! on.. the seashore."
  );
  expect(headingText).toMatch("She sells seashells on the seashore");
});

test("Tokenizing of a heading.", () => {
  const headingTokens = tokenizeHeading("She sells seashells on the seashore");
  expect(headingTokens).toHaveLength(4);
  expect(headingTokens).toContain("she");
  expect(headingTokens).toContain("sells");
  expect(headingTokens).toContain("seashells");
  expect(headingTokens).toContain("seashore");
});

test("Testing scraping of a website for headings.", async () => {
  const webHeadings = await scrapeWebsiteForHeadings(
    "https://en.wikipedia.org/wiki/Nikola_Tesla"
  );
  expect(webHeadings.success).toBe(true);
});
