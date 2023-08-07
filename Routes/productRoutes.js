// const ProductModel = require('../Models/products.Model');

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String, 
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['Clothing', 'Electronics', 'Furniture', 'Other'],
  },
  image: {
    type: String,
    required: true,
  },
  location: {
    type: String, 
    default: true,
  },
  postedAt: {
    type: Date, 
    required: true,
  },
  price: {
    type: Number, 
    required: true,
  },

}, {
  timestamps: true,
});

const ProductModel = mongoose.model('Product', productSchema);






const ProductRouter = require('express').Router()

ProductRouter.get('/', async (req, res) => {
    const { category, sortBy, search, page, sortOrder} = req.query;
    const pageSize = 4;
    const skip = (page - 1) * pageSize;

    console.log(sortOrder, sortBy);

    let query = {};

    if (category) {
        query.category = category;
    }

    if (search) {
        query.name = { $regex: search, $options: 'i' };
    }

    let sortOptions = {};
    if (sortBy === 'date') {
        if (sortOrder === 'asc') {
            sortOptions.postedAt = 1; 
        } else if(sortOrder === 'desc') {
            sortOptions.postedAt = -1;
        }
    }
    try {
        const totalCount = await ProductModel.countDocuments(query);
        const products = await ProductModel.find(query)
            .sort(sortOptions)
            .skip(skip)
            .limit(pageSize);

        res.send({ products, totalCount });
    } catch (error) {
        res.status(500).send({ message: 'Error fetching products', error });
    }
});

ProductRouter.post('/add', async (req, res) => {
    let { name, description, category, image, location, postedAt, price } = req.body;

    try {
        let newProduct = await new ProductModel({
            name, 
            description,
            category,
            image,
            location,
            postedAt,
            price
        });
        newProduct.save();
        res.send({message : 'Product added successfully'});

    } catch (error) {
        res.status(500).send({ message: 'Error adding product', error });
    }
})


ProductRouter.delete('/delete/:productId', async (req, res) => {
    try {
        const productId = req.params.productId;
        await ProductModel.findByIdAndDelete(productId);
        res.send({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).send({ message: 'Error deleting product', error });
    }
});

module.exports = ProductRouter