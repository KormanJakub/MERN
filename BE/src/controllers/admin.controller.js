const HttpError = require("../util/HttpError");
const userModel = require("../models/user.model");

const getAllUsers = async (req, res) => {
    const records = await userModel.find();
    res.send(records);
};

const deleteUser = async (req, res) => {
    try {
        await userModel.findByIdAndDelete(req.params.id);
    } catch (error) {
        throw new HttpError(`Database error: ${error.message}`, 500);
    }
    res.send({});
};

const updateUser = [
    /*
    body("nickName").not().isEmpty(),
    body("email").not().isEmpty().isEmail(),
    async (req, res) => {
        checkValidation(validationResult(req));

        const matched = matchedData(req, {
            onlyValidData: true,
        });

        const record = await userModel.findById(req.params.id);
        if (!record) {
            throw new HttpError("Type does not exists!", 404);
        }

        Object.assign(record, matched);

        try {
            const comments = await commentModel.find({commentatorId: record._id});

            for (const comment of comments) {
                comment.commentatorName = matched.commentatorName;
                await comment.save();
            }

            const articles = await articleModel.find({userId: record._id});

            for (const article of articles) {
                article.userName = article.userName;
                await article.save();
            }

            await record.save();

        } catch (error) {
            throw new HttpError(`Database error: ${error.message}`, 500);
        }

        res.send({});
    },
    */
];

module.exports = {
    getAllUsers,
    deleteUser,
    //updateUser
};