module.exports = function getAssetWithProduct(assets, productId) {
    const result = [];
    assets.forEach(asset => {
        const subscriptions = asset.subscriptions;
        const hasProduct = subscriptions.reduce((acc, subscription) => {
            return bundleHasProduct(subscription.bundles, productId) || acc;
        }, false);
        if(hasProduct){
            result.push(asset);
        }
    });
    return result;
};

function bundleHasProduct(bundles, productId) {
    return bundles.reduce((acc, bundle) => {
        return ((bundle.localProductId === productId) ? true : false) || acc;
    }, false);
}
