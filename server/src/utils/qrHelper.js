function getShopUrl(shopId) {
  const baseUrl = process.env.PUBLIC_APP_URL;

  if (!baseUrl) {
    throw new Error("PUBLIC_APP_URL is missing in .env");
  }

  return `${baseUrl}/#/shop/${shopId}`;
}

module.exports = {
  getShopUrl
};
