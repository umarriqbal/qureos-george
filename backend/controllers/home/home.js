const homeController = async (req, res) => {
  try {
    res.status(200).send({
      success: true,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      error: err,
    });
  }
};

module.exports = homeController;
