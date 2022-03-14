const { removeStopwords } = require("stopword");
const prettyLink = require("prettylink");
const axios = require("axios");
const cheerio = require("cheerio");
const WebsiteToken = require("../models/WebsiteToken");
const Member = require("../models/Member");
const mongoose = require("mongoose");

const shortenURL = async (website) => {
  var tinyURLMaker = new prettyLink.TinyURL();
  try {
    return await tinyURLMaker.short(website);
  } catch (err) {
    return false;
  }
};

const preprocessHeading = (inputHeading) => {
  // Remove everything in tags, extra whitespace.
  return inputHeading
    .replace(/\[.*?\]/g, "")
    .replace(/\s+/g, " ")
    .trim();
};

const postprocessHeading = (inputHeading) => {
  // Remove punctuation.
  return inputHeading.replace(/[^\w\s]|_/g, "");
};

const tokenizeHeading = async (inputHeading) => {
  // This function is used to preprocess headings data including removing stop words and
  // tokenizing for better search results.
  try {
    return removeStopwords(
      postprocessHeading(inputHeading).toLowerCase().split(" ")
    );
  } catch (err) {
    return [];
  }
};

const scrapeWebsiteForHeadings = async (website) => {
  try {
    var allTokens = {};
    var allHeadings = [];
    const { data } = await axios.get(website);
    if (!data) {
      throw "No data!";
    }
    const $ = cheerio.load(data);
    const pageHeadings = $("h1, h2, h3")
      .map((idx, elem) => $(elem).text())
      .get();

    for (idx in pageHeadings) {
      const heading = pageHeadings[idx];
      const headingText = await preprocessHeading(heading);
      const headingTokens = await tokenizeHeading(headingText);
      if (!allHeadings.includes(headingText)) {
        allHeadings.push(headingText);
        allTokens[headingText] = headingTokens;
      }
    }
    return {
      success: true,
      tokens: allTokens,
      headings: allHeadings,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
    };
  }
};

const insertNewMemberData = async (
  name,
  website,
  websiteShort,
  websiteHeadings,
  websiteTokens
) => {
  var tokenDocs = [];
  Object.keys(websiteTokens).forEach((heading) => {
    var headingTokens = websiteTokens[heading];
    headingTokens.forEach((token) => {
      tokenDocs.push({
        website: website,
        headingText: heading,
        headingToken: token,
      });
    });
  });

  var memberData = {
    name: name,
    website: website,
    websiteShort: websiteShort,
    websiteHeadings: websiteHeadings,
  };
  try {
    const session = await mongoose.startSession();
    await session.withTransaction(async () => {
      const tokensInserted = await WebsiteToken.collection.insertMany(
        tokenDocs,
        {
          session: session,
        }
      );
      if (tokensInserted) {
        const memberObj = await Member.create([memberData], {
          session: session,
        });
        if (!memberObj) {
          throw "Something went wrong while inserting member!";
        }
      }
      throw "Something went wrong while inserting documents for member!";
    });
    session.endSession();
  } catch (err) {
    return false;
  }
  return memberData;
};

module.exports.shortenURL = shortenURL;
module.exports.scrapeWebsiteForHeadings = scrapeWebsiteForHeadings;
module.exports.insertNewMemberData = insertNewMemberData;
