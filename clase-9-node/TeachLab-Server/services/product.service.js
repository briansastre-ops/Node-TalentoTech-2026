import * as ProductModel from '../models/product.model.js';

export const getAllProducts = async () => {
    return await ProductModel.readProducts();
};

export const getProductById = async (id) => {
    return await ProductModel.findById(id);
};

export const getProductsByCategory = async (category) => {
    return await ProductModel.filterByCategory(category);
};