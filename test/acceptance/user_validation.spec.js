const credentials = require("../../src/get_params")();
const userValidation = require("../../src/user_validation");

describe("userValidation", function (){
    let userOkResult, myUser;
    beforeEach(function (){
        myUser = {
            username: credentials.username,
            password: credentials.password
        };
    });
    it("calls correctly the endpoint", function (){
        this.timeout = 10000;
        return userValidation().then(response => {
            expect(response.token).to.exist;
        });
    });
});