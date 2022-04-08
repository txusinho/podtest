const index = require("../../src/index");

describe("index", () => {
    it("gets the username", () => {
        const { username } = index();
        expect(username).to.equal("testing.user");
    });
});