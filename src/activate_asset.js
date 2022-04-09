const { getTokenHeader } = require("./get_token_header");
const { put } = require("./http");
const User = require("./model/user");
const userValidation = require("./user_validation");

function getPutPath(assetId) {
    const path = ["assets","subscribe"];
    path.splice(1, 0, assetId);
    return `/${path.join("/")}`;
}

function callActivateAsset(accountId, token, assetId, productId){
    const path = ["assets","subscribe"];
    const params = {
        accountId,
        "subscription": {
          "subscriberAccountId": accountId,
          productId
        }
    };
    path.splice(1, 0, assetId);
    return put(getPutPath(assetId), params, getTokenHeader(token));
}

module.exports = function activateAsset(assetId, productId){
    return userValidation().then(session => {
        const user = new User(session.user);
        const token = session.token;
        const accountId = user.getMainAccountId();
        return callActivateAsset(accountId, token, assetId, productId);
    });
};