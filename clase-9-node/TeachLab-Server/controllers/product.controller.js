import * as ProductService from '../services/product.service.js';

export const getProducts = async (req, res) => {
    const { category } = req.query;

    if (category) {
        const filtered = await ProductService.getProductsByCategory(category);
        return res.json({ status: "success", data: filtered });
    }

    const allProducts = await ProductService.getAllProducts();
    res.json({ status: "success", data: allProducts });
};

export const getOneProduct = async (req, res) => {
    const { id } = req.params;
    const product = await ProductService.getProductById(id);

    if (!product) {
        return res.status(404).json({ status: "error", message: "Producto no encontrado en el inventario." });
    }

    res.json({ status: "success", data: product });
};