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
      if (tokensInserted.acknowledged === true) {
        const memberObj = await Member.create([memberData], {
          session: session,
        });
        if (!memberObj) {
          throw "Something went wrong while inserting member!";
        }
      } else {
        throw "Something went wrong while inserting documents for member!";
      }
    });
    session.endSession();
  } catch (err) {
    console.log(err);
    return false;
  }
  return memberData;
};

const isFriends = async (friend1, friend2) => {
  var friend1Friends = [];
  friend1.friendList.forEach((f) => {
    friend1Friends.push(`${f._id}`);
  });

  if (friend1Friends.includes(`${friend2._id}`)) {
    return true;
  }
  return false;
};

const makeFriends = async (friend1, friend2) => {
  try {
    const session = await mongoose.startSession();
    await session.withTransaction(async () => {
      friend1.friendList.push(friend2);
      friend2.friendList.push(friend1);
      await friend1.save({ session });
      await friend2.save({ session });
    });
    session.endSession();
  } catch (err) {
    return false;
  }
  return true;
};

const getMembersFromToken = async (token) => {
  var memberIds = [];
  const tokenObjs = await WebsiteToken.find({
    headingToken: token,
  }).populate("writer");
  tokenObjs.forEach((token) => {
    token.writer.forEach((writer) => {
      if (!memberIds.includes(`${writer._id}`)) {
        memberIds.push(`${writer._id}`);
      }
    });
  });
  return memberIds;
};

const getMembersWithName = async (nameToken) => {
  var memberIds = [];
  const memberObjs = await Member.find({
    name: { $regex: `^${nameToken}`, $options: "i" },
  });
  memberObjs.forEach((memberObj) => {
    if (!memberIds.includes(`${memberObj._id}`)) {
      memberIds.push(`${memberObj._id}`);
    }
  });
  return memberIds;
};

const getFilterParams = async (queryParams) => {
  var filterIds = [];

  if (queryParams.memberId) {
    filterIds.push(queryParams.memberId);
  }

  if (queryParams.token) {
    const tokenMemberIds = await getMembersFromToken(queryParams.token);
    if (tokenMemberIds) {
      filterIds.push(...tokenMemberIds);
    }
  }

  if (queryParams.nameToken) {
    const nameMemberIds = await getMembersWithName(queryParams.nameToken);
    if (nameMemberIds) {
      filterIds.push(...nameMemberIds);
    }
  }

  return filterIds;
};

module.exports.shortenURL = shortenURL;
module.exports.scrapeWebsiteForHeadings = scrapeWebsiteForHeadings;
module.exports.insertNewMemberData = insertNewMemberData;
module.exports.isFriends = isFriends;
module.exports.makeFriends = makeFriends;
module.exports.getMembersFromToken = getMembersFromToken;
module.exports.getFilterParams = getFilterParams;
