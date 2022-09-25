
const Brand = require("../models/Brand");

exports.createBrandService = async (data) => {
    const result = await Brand.create(data);
    return result;
};
exports.getBrandsService = async () => {
    const brands = await Brand.find({}).select('-products -suppliers');
    return brands;
};
exports.getBrandByIdService = async () => {
    const brands = await Brand.findOne({ _id: id });
    return brand;
};

exports.updateBrandService = async (id,data) => {
    const brands = await Brand.updateOne({ _id: id },data,{
        runValidators:true
    });
    return result;
};