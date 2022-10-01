


exports.getStores = async (req, res) => {
    try {
        const stores = await getStoresService();

        res.status(200).json({
            status: "success",
            data: stores
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "can't get the stores",
            error: error.message,
        });
    }
};

exports.createStore = async (req, res) => {
    try {
        const result = await createStoreService(req.body);

        res.status(200).json({
            status: "Store created successfully",
            data: result
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "can't create the store",
            error: error.message,
        });
    }
};

exports.getStoreById = async (req, res) => {
    const { id } = req.params;
    try {
        
    } catch (error) {
        
    }
}