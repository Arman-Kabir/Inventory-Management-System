
// const Product = require('../models/Product');
const { getStocksService, createStockService, updateProductService, bulkUpdateProductService, deleteProductByIdService, bulkDeleteProductService, fileUploadService } = require('../services/stock.service');

exports.getStocks = async (req, res, next) => {
    try {
        
        let filters = { ...req.query };
        //  /stock?sortBy=price&price=5000&name=chal&location=dhaka

        // sort,limit,page ->exclude
        const excludeFields = ['sort', 'page', 'limit'];
        excludeFields.forEach(field => delete filters[field]);

        //  gt,lt,gte,lte
        let filtersString = JSON.stringify(filters);
        filtersString = filtersString.replace(/\b(gt|gte|lt|lte)\b/, match => `$${match}`);

        filters = JSON.parse(filtersString);
        console.log(filters);

        const queries = {};


        if (req.query.sort) {
            // price,quantity -> 'price quantity'
            const sortBy = req.query.sort.split(',').join(' ');
            queries.sortBy = sortBy
            console.log(sortBy);
        }
        if (req.query.fields) {
            const fields = req.query.fields.split(',').join(' ');
            queries.fields = fields
            console.log(fields);
        }

        if (req.query.page) {
            const { page = 1, limit = 10 } = req.query;
            // 50 products
            // each page 10 products
            const skip = (page - 1) * parseInt(limit);
            queries.skip = skip;
            queries.limit = parseInt(limit);
        }

        // console.log('Original Object',req.query);
        // console.log('query object',queryObject);

        const stocks = await getStocksService(filters, queries);

        res.status(200).json({
            status: "Success",
            data: stocks
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "can't get data",
            error: error.message
        })
    }
};

exports.createStock = async (req, res, next) => {
    // res.send('it is working');
    // console.log(req.body);
    try {
        // const product = new Product(req.body)
        // const result = await product.save()
        const result = await createStockService(req.body)
        // result.logger()

        res.status(200).json({
            status: 'success',
            message: 'stock created successfully',
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: 'stock is not created',
            error: error.message
        })
    }
    // save or create

};

// exports.updateProduct = async (req, res, next) => {
//     try {
//         const { id } = req.params;
//         const result = await updateProductService(id, req.body);
//         res.status(200).json({
//             status: "success",
//             message: "Successfully updated the product"
//         })

//     } catch (error) {
//         res.status(400).json({
//             status: 'fail',
//             message: `Couldn't update the product`,
//             error: error.message
//         })
//     }
// };

// exports.bulkUpdateProduct = async (req, res, next) => {
//     try {
//         // const { id } = req.params;
//         console.log(req.body);
//         const result = await bulkUpdateProductService(req.body);

//         res.status(200).json({
//             status: "success",
//             message: "Successfully updated the product"
//         })

//     } catch (error) {
//         res.status(400).json({
//             status: 'fail',
//             message: `Couldn't update the product`,
//             error: error.message
//         })
//     }
// };

// exports.deleteProductById = async (req, res, next) => {
//     try {
//         const { id } = req.params;
//         // console.log(req.body);
//         const result = await deleteProductByIdService(id);
//         await console.log(result);

//         res.status(200).json({
//             status: "success",
//             message: "Successfully deleted the product"
//         })

//     } catch (error) {
//         res.status(400).json({
//             status: 'fail',
//             message: `Couldn't delete the product`,
//             error: error.message
//         })
//     }
// };


// exports.bulkDeleteProduct = async (req, res, next) => {
//     try {
//         // const { id } = req.params;
//         console.log(req.body);
//         const result = await bulkDeleteProductService(req.body.ids);

//         res.status(200).json({
//             status: "success",
//             message: "Successfully deleted the product"
//         })

//     } catch (error) {
//         res.status(400).json({
//             status: 'fail',
//             message: `Couldn't delete the product`,
//             error: error.message
//         })
//     }
// };


// exports.fileUpload = async (req, res) => {
//     try {
        
//         // const productImage = await fileUploadService(req.file);
//         // res.status(200).json(req.file)
//         res.status(200).json(req.files)
//     } catch (error) {
//         // res.status(400).json({
//         //     status: 'fail',
//         //     message: `Couldn't create the image`,
//         //     error: error.message
//         // })
//     }
// }
