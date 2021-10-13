var db = require('../config/connection')
var collection = require('../config/collection')
var objectId = require('mongodb').ObjectId
module.exports = {

    addproduct: (product, callback) => {
        //console.log(product)
        db.get().collection('product').insertOne(product).then((data) => {
            console.log(data)
            callback(data.insertedId)
        })
    },
    getAllProducts: () => {
        return new Promise(async (resolve, reject) => {
            products = await db.get().collection(collection.PRODUCT_COLLECTION).find().toArray()
            resolve(products)
        })
    },
    productDelete: (proId) => {
        return new Promise((resolve, reject) => {
            console.log(proId)
            db.get().collection(collection.PRODUCT_COLLECTION).deleteOne({ _id: objectId(proId) }).then((response) => {
                resolve(response)
                console.log(response);
            })
        })


    }, getProductDetails: (proId) => {
        return new Promise((resolve, reject) => {
            db.get().collection(collection.PRODUCT_COLLECTION).findOne({ _id: objectId(proId) }).then((product) => {
                resolve(product)
                console.log(product)
            })
        })
    }, updateProduct: (proId, proDetails) => {
        return new Promise((resolve, reject) => {
            db.get().collection(collection.PRODUCT_COLLECTION).
                updateOne({ _id: objectId(proId) }, {
                    $set: {
                        Name: proDetails.Name,
                        Company: proDetails.Company,
                        Price: proDetails.Price

                    }
                }).then((response) => {
                    resolve()
                })
        })
    }
}