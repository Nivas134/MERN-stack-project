const Product = require("../models/product")
const formidable = require("formidable")
const _ = require("lodash")

exports.getProductById = (req, res, next, id) => {
    Product.findById(id)
    .populate("category")
    .exec((err,product) => {
        if(err){
            return res.status(400).json({
                error: "Product not found"
            });
        }
        req.product = product;
        next ();
    })
}

exports.createProduct = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req,(err,fields) => {
        if(err) {
            return res.status(400).json({
                error: "error occured while uploading the file"
            });
        }
        //destructuring the fields
        const {name, description, price, category, stock} = fields

        if(!name || !description || !price || !category || !stock){
            return res.status(400).json({
                error: "please include all fields"
            })
        }

        let product = new Product(fields)

        //handle file here
        // if(file.photo) {
        //     if(file.photo.size > 3000000){
        //         return res.status(400).json({
        //             error: "File size id too big!"
        //         })
        //     }
        //     product.photo.data = fs.readFileSync(file.photo.path)
        //     product.photo.contentType = file.photo.type
        // }
        
        //save to the DB
        product.save((err) => {
            if(err){
                res.status(400).json({
                    error: "Saving tshirt in DB failed"
                })
            }
            res.send("saved successfully");
        })

    });

}

exports.getProduct = (req,res) => {
    // req.product.photo = undefined
    return res.json(req.product)
}

// exports.photo = (req,res, next) => {
//     if(req.product.photo.data) {
//         res.set("Content-Type", req.product.photo.contentType)
//         return res.send(req.product.photo.data)
//     }
//     next();
// }

exports.deleteProduct = (req,res) => {
    let product = req.product;
    product.remove((err) => {
        if (err){
            return res.status(400).json({
                error: "Failed to delete the product"
            })
        }
        res.send("data deleted successfully")
    })
}

exports.updateProduct = (req,res) => {
    
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req,(err,fields) => {
        if(err) {
            return res.status(400).json({
                error: "error occured while uploading the file"
            });
        }
        //destructuring the fields
        
        // update using lodash
        let product = req.product;
        product = _.extend(product, fields)


        //handle file here
        // if(file.photo) {
        //     if(file.photo.size > 3000000){
        //         return res.status(400).json({
        //             error: "File size id too big!"
        //         })
        //     }
        //     product.photo.data = fs.readFileSync(file.photo.path)
        //     product.photo.contentType = file.photo.type
        // }
        
        //save to the DB
        product.save((err) => {
            if(err){
                res.status(400).json({
                    error: "Updatig of tshirt in DB failed"
                })
            }
            res.send("saved successfully");
        })

    });

}

exports.getAllProducts = (req, res) => {
    let limit = req.query.limit ? parseInt(req.query.limit) : 8
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id"
    Product.find()
    // .select("-photo")
    .sort([[sortBy,"asc"]])
    .populate("category")
    .limit(limit)
    .exec((err, products) => {
        if(err) {
            return res.status(400).json({
                error: "No product found"
            })
        }
        res.json(products)
    })
}

exports.updateStock = (req, res, next) => {
    let myoperations = req.body.order.products.map(prod => {
        return {
            updateOne: {
                filter: {_id: prod._id},
                update: {$inc: {stock: -prod.count, sold: +prod.count}}
            }
        }
    })

    Product.bulkWrite(myoperations, {}, (err) => {
        if(err){
            return res.status(400).json({
                error: "Bulk operation failed"
            })
        }
        next();
    })
}

exports.getAllUniqueCategories = (req,res) => {
    Product.distinct("category", {}, (err, category) => {
        if(err){
            return res.status(400).json({
                error: "No category found"
            })
        }
        res.json(category)
    })
}