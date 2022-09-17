
const Product = require('../models/Product');
const { getProductsService, createProductService } = require('../services/product.services');

exports.getProducts = async (req, res, next) => {
    try {
        // const products = await (await Product.where("name").equals("/\w/").where("quantity").gt(100)).lt(600).limit(2).sort({ quantity: -1 })

        const products = await getProductsService()

        res.status(200).json({
            status: "Success",
            data: products
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "can't get data",
            error: error.message
        })
    }
}

exports.createProduct = async (req, res, next) => {
    // res.send('it is working');
    // console.log(req.body);
    try {
        // const product = new Product(req.body)
        // const result = await product.save()
        const result = await createProductService(req.body)
        // result.logger()

        res.status(200).json({
            status: 'success',
            message: 'Data inserted successfully',
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: 'Data is not inserted',
            error: error.message
        })
    }
    // save or create

}