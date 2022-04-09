const User = require("./model/user");
const { post } = require("./http");
const userValidationProcess = require("./user_validation");
const { getTokenHeader } = require("./get_token_header");

function callUserCreationEndpoint(user, token, accountId) {
    const path = "/users";
    const payload = {
        "accountId": accountId,
        "username": user.username,
        "password": user.password,
        "email": user.email,
        "status": "active",
        "permissions": [
          {
            "accountId": accountId,
            "roles": user.roles
          }
        ]
      };
      const extraHeaders = getTokenHeader(token);
      return post(path, payload, extraHeaders);

}

function createUsers(users, userValidation=userValidationProcess) {
    return userValidation().then(session => {
        const parent = new User(session.user);
        const token = session.token;
        const accountId = parent.getMainAccountId();
        return Promise.all(users.map(user => {
            return callUserCreationEndpoint(user, token, accountId);
        }));
    });
};
module.exports = { createUsers, callUserCreationEndpoint };