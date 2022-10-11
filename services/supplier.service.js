
const Supplier = require("../models/Supplier");

exports.createSupplierService = async (data) => {
    console.log(data);
    const result = await Supplier.create(data);
    return result;
};
exports.getSuppliersService = async () => {
    console.log('getting brands');
    const suppliers = await Supplier.find({}); //.select('-products -suppliers')
    return suppliers;
};
exports.getSupplierByIdService = async () => {
    const supplier = await Supplier.findOne({ _id: id });
    return supplier;
};

exports.updateSupplierService = async (id,data) => {
    const result = await Supplier.updateOne({ _id: id },data,{
        runValidators:true
    });
    return result;
};