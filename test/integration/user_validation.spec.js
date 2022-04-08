const nock = require("nock");

const credentials = require("../../src/get_params")();
const userValidation = require("../../src/user_validation");

describe("userValidation", () => {
    let userOkResult, myUser;
    beforeEach(() => {
        myUser = {
            username: credentials.username,
            password: credentials.password
        };

        userOkResult = {
            "token": "string",
        };
        nock("https://hummingbird-staging.podgroup.com").
            post("/auth/token", JSON.stringify(myUser)).
            reply(200, userOkResult);
    });
    it("calls correctly the endpoint", () => {
        return userValidation().then(response => {
            expect(response).to.deep.equal(userOkResult);
        });
    });
});