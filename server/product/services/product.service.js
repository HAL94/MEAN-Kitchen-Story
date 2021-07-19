const Product = require('../product.schema');
const Category = require('../category.schema');

const ErrorHandler = require('../../_utils/handle-error');

exports.getAllProducts = async (req, res, next) => {
    try {
        const products = await Product.find({})
            .populate('category')
            .exec();

        if (!products) {
            throw new Error('An error has occured while fetching');
        }


        const mappedProds = products.map((prod) => {
            return {
                id: prod._id,
                imageUrl: prod.imageUrl,
                name: prod.name,
                price: prod.price,
                category: {
                    id: prod.category._id,
                    name: prod.category.name
                }
            }
        });        

        return res.status(200).json(mappedProds);

    } catch (error) {
        ErrorHandler.handleError(error, req, res, next);
    }
}
exports.searchProducts = async (req, res, next) => {
    try {

        console.log(req.query);
        let queryFilter = req.query;
        
        if (Object.keys(queryFilter).length !== 0) {
            
            const searchQuery = queryFilter.search_query;
            queryFilter = { name: {$regex: searchQuery, $options: 'i'}};
            
            if (req.query.categories && req.query.categories.length > 3) {
                const categories = req.query.categories.split(",");                              
                queryFilter['category'] = { $in: categories };                
            }
        }

        const currentPage = +req.query.page ? +req.query.page : 1;
        const pageSize = +req.query.pageSize ? +req.query.pageSize : 0;


        const products = await Product.find(queryFilter)
            .populate('category')
            .skip(pageSize * (currentPage - 1))
            .limit(pageSize)
            .exec();

        const count = await Product.countDocuments(queryFilter).exec();

        if (!products) {
            throw new Error('An error has occured while fetching');
        }


        const mappedProducts = products.map((prod) => {
            return {
                id: prod._id,
                imageUrl: prod.imageUrl,
                name: prod.name,
                price: prod.price,
                category: {
                    id: prod.category._id,
                    name: prod.category.name
                }
            }
        });        

        return res.status(200).json({
            products: mappedProducts, 
            count: count
        });

    } catch (error) {
        ErrorHandler.handleError(error, req, res, next);
    }
}

exports.addProduct = async (req, res, next) => {
    try {
        const imageUrl = req.body.imageUrl;
        const name = req.body.name;
        const price = req.body.price;
        const category = req.body.category;

        const product = new Product({
            imageUrl: imageUrl,
            name: name,
            price: price,
            category: category.id
        });

        const savedProduct = await product.save();



        return res.status(201).json({
            id: savedProduct._id,
            imageUrl: savedProduct.imageUrl,
            name: savedProduct.name,
            price: savedProduct.price,
            category: category
        });

    } catch (error) {
        ErrorHandler.handleError(error, req, res, next);
    }
}

exports.editProduct = async (req, res, next) => {
    try {
        const prodId = req.params.id;
        const productFound = await Product.findOne({_id: prodId})
            .populate('category')
            .exec();
        
        

        if (!productFound) {
            throw new Error('Product not found');
        }

        const prodCategory = {...req.body.category};

        productFound.imageUrl = req.body.imageUrl;
        productFound.name = req.body.name;
        productFound.price = req.body.price;
        productFound.category = prodCategory.id;

        console.log('product edit', productFound, prodCategory);

        await productFound.save();

        return res.status(200).json({
            id: productFound._id,
            imageUrl: productFound.imageUrl,
            name: productFound.name,
            price: productFound.price,
            category: prodCategory
        });

    } catch (error) {
        ErrorHandler.handleError(error, req, res, next);
    }
}

exports.deleteProduct = async (req, res, next) => {
    try {
        const id = req.params.id;
        const removed = await Product.remove({_id: id}).exec()
        if (removed) {
            return res.status(200).json({
                success: true
            });
        }

        throw new Error('Deletion Failed');
    } catch (error) {
        ErrorHandler.handleError(error, req, res, next);
    }
}

exports.addCategory = async (req, res, next) => {
    try {
        const catName = req.body.name;
        const category = Category({name: catName});
        const savedCat = await category.save();
        res.status(201).json({
            id: savedCat._id,
            name: savedCat.name
        });
    } catch (error) {
        ErrorHandler.handleError(error, req, res, next);
    }
}

exports.getCategories = async (req, res, next) => {
    try {
        const allCategories = await Category.find({}).exec()

        const mappedCats = allCategories.map((cat) => {
            return {
                id: cat._id,
                name: cat.name
            }
        });

        res.status(200).json(mappedCats);
    } catch (error) {
        ErrorHandler.handleError(error, req, res, next);
    }
}