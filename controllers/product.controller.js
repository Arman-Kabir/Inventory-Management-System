
// const Product = require('../models/Product');
const { getProductsService, createProductService, updateProductService, bulkUpdateProductService, deleteProductByIdService, bulkDeleteProductService } = require('../services/product.services');

exports.getProducts = async (req, res, next) => {
    try {
        // const products = await (await Product.where("name").equals("/\w/").where("quantity").gt(100)).lt(600).limit(2).sort({ quantity: -1 })
        const filters = { ...req.query };
        // sort,limit,page ->exclude
        const excludeFields = ['sort', 'page', 'limit'];
        excludeFields.forEach(field => delete filters[field]);

        const queries = {}
        if(req.query.sort){
            // price,quantity -> 'price quantity'
            const sortBy = req.query.sort.split(',').join(' ');
            queries.sortBy=sortBy
            console.log(sortBy);
        }
        if(req.query.fields){
            const fields = req.query.fields.split(',').join(' ');
            queries.fields=fields
            console.log(fields);
        }

        // console.log('Original Object',req.query);
        // console.log('query object',queryObject);

        const products = await getProductsService(filters,queries);

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
};

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

};

exports.updateProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await updateProductService(id, req.body);
        res.status(200).json({
            status: "success",
            message: "Successfully updated the product"
        })

    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: `Couldn't update the product`,
            error: error.message
        })
    }
};

exports.bulkUpdateProduct = async (req, res, next) => {
    try {
        // const { id } = req.params;
        console.log(req.body);
        const result = await bulkUpdateProductService(req.body);

        res.status(200).json({
            status: "success",
            message: "Successfully updated the product"
        })

    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: `Couldn't update the product`,
            error: error.message
        })
    }
};

exports.deleteProductById = async (req, res, next) => {
    try {
        const { id } = req.params;
        // console.log(req.body);
        const result = await deleteProductByIdService(id);
        await console.log(result);

        res.status(200).json({
            status: "success",
            message: "Successfully deleted the product"
        })

    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: `Couldn't delete the product`,
            error: error.message
        })
    }
};


exports.bulkDeleteProduct = async (req, res, next) => {
    try {
        // const { id } = req.params;
        console.log(req.body);
        const result = await bulkDeleteProductService(req.body.ids);

        res.status(200).json({
            status: "success",
            message: "Successfully deleted the product"
        })

    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: `Couldn't delete the product`,
            error: error.message
        })
    }
};
