const Member = require("../../models/Member");
const createMemberValidator = require("../../validators/createMember");
const {
  shortenURL,
  scrapeWebsiteForHeadings,
  insertNewMemberData,
} = require("../../modules/member");

const createMemberController = async (req, res) => {
  const { error } = createMemberValidator(req.body);

  if (error) {
    return res.status(400).send({
      success: false,
      error: {
        message: error.details[0].message,
      },
    });
  }

  const memberExists = await Member.findOne({ website: req.body.website });
  if (memberExists) {
    return res.status(400).send({
      success: false,
      error: {
        message: "A member with this website already exists.",
      },
    });
  }

  const websiteShort = await shortenURL(req.body.website);
  if (!websiteShort) {
    return res.status(400).send({
      success: false,
      error: {
        message:
          "Something went wrong while shortening URL. Ensure URL is correct.",
      },
    });
  }

  const websiteContent = await scrapeWebsiteForHeadings(req.body.website);
  if (!websiteContent || !websiteContent.success) {
    return res.status(400).send({
      success: false,
      error: {
        message:
          "Something went wrong while scraping URL. Ensure URL is correct and accessible.",
      },
    });
  }

  const memberInfo = await insertNewMemberData(
    req.body.name,
    req.body.website,
    websiteShort,
    websiteContent.headings,
    websiteContent.tokens
  );

  if (!memberInfo) {
    return res.status(501).send({
      success: false,
      error: {
        message: "Something went wrong.",
      },
    });
  } else {
    return res.status(200).send({
      success: true,
      data: memberInfo,
    });
  }
};
module.exports = createMemberController;
