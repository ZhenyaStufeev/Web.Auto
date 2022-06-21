const { default: axios } = require("axios");
const host = window.location.origin;

const searchProducts = (value) => {
    return axios.post(host + "/api/Store/searchproducts", {value: value});
}

const getCategories = () => {
    return axios.get(host + "/api/Store/getmenucategories");
}

const getFilters = (categoryId) => {
    return axios.get(host + "/api/Store/getfilters/" + categoryId);
}

const getProducts = (FiltersId, MinPrice, MaxPrice, OrderType, NumberOfPage, CategoryId) =>
{
    return axios.post(host + "/api/Store/getproducts", {FiltersId, MinPrice, MaxPrice, OrderType, NumberOfPage, CategoryId});
}

const getCartProducts = (ProductsId) =>
{
    return axios.post(host + "/api/Store/getcartproducts", {ProductsId: ProductsId});
}

const getRandomProducts = () =>
{
    return axios.get(host + "/api/Store/getrandomproducts");
}

module.exports = {
    searchProducts,
    getCategories,
    getProducts,
    getFilters,
    getCartProducts,
    getRandomProducts
};