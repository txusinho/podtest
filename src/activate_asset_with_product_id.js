const listAssets = require("./list_assets");
const filterAssetsWithProduct = require("./filter_assets_with_product");
const activateAsset = require("./activate_asset");

module.exports = function activateAssetsWithProductId(productId){
    return listAssets().then(assets => {
        const activationQueue = filterAssetsWithProduct(assets, productId);
        return Promise.all(activationQueue.map(candidate => {
            return activateAsset(candidate.iccid, productId);
        }));
    });
};