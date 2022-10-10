const { createBrandService, getBrandsService, getBrandByIdService, updateBrandService } = require("../services/brand.service");

exports.createBrand = async (req, res, next) => {
    try {
        const result = await createBrandService(req.body);

        res.status(200).json({
            status:"Success",
            message:"Successfully created the brand",
            data:result
        })
    } catch (error) {
        res.status(400).json({
            status:"fail",
            error:"Couldn't create the brand"
        })
    }
};

exports.getBrands = async (req, res, next) => {
    try {
        const brands = await getBrandsService();

        res.status(200).json({
            status:"Success",
            data:brands
        })
    } catch (error) {
        res.status(400).json({
            status:"fail",
            error:"Couldn't get the brands"
        })
    }
};

exports.getBrandsById = async (req, res, next) => {
    const {id} = req.params;
    try {
        const brand = await getBrandByIdService(id);

        if(!brand){
            return res.status(400).json({
                status:"fail",
                error:"COuldn't find brand with this id"
            })
        }

        res.status(200).json({
            status:"Success",
            data:brand
        })
    } catch (error) {
        res.status(400).json({
            status:"fail",
            error:"Couldn't get the brands"
        })
    }
};

exports.updateBrand = async (req, res, next) => {
    const {id} = req.params;
    try {
        const brand = await updateBrandService(id,req.body);

        console.log(result);

        if(!result.nModified){
            res.status(400).json({
                status:"fail",
                error:"COuldn't update the  brand with this id"
            })
        }

        res.status(200).json({
            status:"Success",
            message:"Successfully updated the brand"
           
        })
    } catch (error) {
        res.status(400).json({
            status:"fail",
            error:"Couldn't get the brands"
        })
    }
};