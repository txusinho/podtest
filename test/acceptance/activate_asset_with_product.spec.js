const getParams = require("../../src/get_params");
const activateAssets = require("../../src/activate_asset_with_product_id");

describe("activateAssetWithProduct", () => {
    let assetId, productId;
    beforeEach(() => {
        productId = "624aac4591bf0b1a16402587";;
    });
    it("calls correctly the endpoint", () => {
        return activateAssets(assetId, productId).then(response => {
            expect(response).to.deep.equal([]);
        }).catch(error => {
        });
    });
});