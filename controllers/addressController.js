const Address = require("../models/Address");

const saveAddress = async (req, res) => {
  try {
    const address = await Address.create(req.body);
    res.json(address);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const getAddresses = async (req, res) => {
  try {
    const data = await Address.find({
      email: req.params.email,
    });

    res.json(data);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = {
  saveAddress,
  getAddresses,
};