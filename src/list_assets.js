const { getTokenHeader } = require("./get_token_header");
const { get } = require("./http");
const User = require("./model/user");
const userValidation = require("./user_validation");

function callListAssetsEndpoint(accountId, token) {
    const endpoint= "/assets";
    return get(endpoint, {
              accountId
        }, getTokenHeader(token));
}

module.exports = function listAssets(){
    return userValidation().then(session => {
        const user = new User(session.user);
        const token = session.token;
        const accountId = user.getMainAccountId();
        return callListAssetsEndpoint(accountId, token);

    });
};