const index = require("../../src/get_params");

describe("index", () => {
    it("gets the username and url", () => {
        const { username, baseUrl } = index();
        expect(username).to.equal("testing.user");
        expect(baseUrl).to.equal("https://hummingbird-staging.podgroup.com");
    });
});