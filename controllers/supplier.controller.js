const { createSupplierService, getSuppliersService, getSupplierByIdService, updateSupplierService } = require("../services/supplier.service");

exports.createSupplier = async (req, res, next) => {
    try {
        const result = await createSupplierService(req.body);

        res.status(200).json({
            status:"Success",
            message:"Successfully created the supplier",
            data:result
        })
    } catch (error) {
        res.status(400).json({
            status:"fail",
            error:"Couldn't create the supplier",
            message:error.message
        })
    }
};

exports.getSuppliers = async (req, res, next) => {
    try {
        const suppliers = await getSuppliersService();

        res.status(200).json({
            status:"Success",
            data:suppliers
        })
    } catch (error) {
        res.status(400).json({
            status:"fail",
            error:"Couldn't get the suppliers"
        })
    }
};

exports.getSupplierById = async (req, res, next) => {
    const {id} = req.params;
    try {
        const supplier = await getSupplierByIdService(id);

        if(!supplier){
            return res.status(400).json({
                status:"fail",
                error:"COuldn't find supplier with this id"
            })
        }

        res.status(200).json({
            status:"Success",
            data:supplier
        })
    } catch (error) {
        res.status(400).json({
            status:"fail",
            error:"Couldn't get the supplier"
        })
    }
};

exports.updateSupplier = async (req, res, next) => {
    const {id} = req.params;
    try {
        const brand = await updateSupplierService(id,req.body);

        console.log(result);

        if(!result.nModified){
            res.status(400).json({
                status:"fail",
                error:"COuldn't update the  supplier with this id"
            })
        }

        res.status(200).json({
            status:"Success",
            message:"Successfully updated the supplier"
           
        })
    } catch (error) {
        res.status(400).json({
            status:"fail",
            error:"Couldn't update the supplier"
        })
    }
};