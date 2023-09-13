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

const getProduct = (ProductId) =>
{
    return axios.get(host + "/api/Store/getproduct/" + ProductId);
}

const getCategory = (categoryId) =>
{
    return axios.get(host + "/api/Store/getcategoryname/" + categoryId);
}

//auth
const signUp = (email,password,userName) =>
{
    return axios.post(host + "/api/Account/signup", { Email: email, Password: password, UserName: userName });
}

const signIn = (email,password) =>
{
    return axios.post(host + "/api/Account/signin", { Email: email, Password: password});
}

module.exports = {
    searchProducts,
    getCategories,
    getProducts,
    getFilters,
    getCartProducts,
    getRandomProducts,
    signIn,
    signUp,
    getProduct,
    getCategory
};