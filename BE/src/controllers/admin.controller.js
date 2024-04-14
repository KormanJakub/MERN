const userModel = require("../models/user.model");

const getAllUsers = async (req, res) => {
    const records = await userModel.find();
    res.send(records);
}

module.exports = {
    getAllUsers
}