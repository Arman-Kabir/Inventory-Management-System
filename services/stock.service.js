
const Stock = require('../models/Stock');
// const Brand = require('../models/Brand');

exports.getStocksService = async (filters, queries) => {
    const stocks = await Product.find(filters).
        skip(queries.skip).
        limit(queries.limit).
        select(queries.fields).
        sort(queries.sortBy);
    const totalProducts = await Product.countDocuments(filters);
    const pageCount = Math.ceil(totalProducts / queries.limit);
    return { pageCount, totalProducts, stocks };
};

exports.createProductService = async (data) => {
    const product = await Product.create(data);
    const { _id: productId, brand } = product;

    // step 1::::   _id,brand
    // update brand
    const res = await Brand.updateOne(
        { _id: brand.id },
        { $push: { products: productId } }
    )
    console.log(res.nModified);
    return product;
};

exports.updateProductService = async (productId, data) => {
    const result = await Product.updateOne({ _id: productId }, { $inc: data }, {
        runValidators: true
    });
    // const product = await Product.findById(productId);
    // const result = await product.set(data).save(); 
    return result;
};

exports.bulkUpdateProductService = async (data) => {
    // console.log(data.ids,data.data);
    // const result = await Product.updateMany({ _id: data.ids }, data.data, {
    //     runValidators: true
    // });

    const products = [];
    data.ids.forEach(product => {
        products.push(Product.updateOne({ _id: product.id }, product.data));
    })

    const result = await Promise.all(products);
    console.log(result);


    return result;
};

exports.deleteProductByIdService = async (id) => {
    const result = await Product.deleteOne({ _id: id });
    return result;
};


exports.bulkDeleteProductService = async (ids) => {
    // console.log(data.ids,data.data);
    const result = await Product.deleteMany({});

    return result;
};

exports.fileUploadService = async (file) => {
    // console.log(data.ids,data.data);
    const result = await Product.create(file);

    return result;
};