const mongoose = require('mongoose')
require('dotenv').config()

const url = process.env.MONGODB_URL;

const MONGO_URL =  'mongodb+srv://ballalamit2:12345Amit12345C@cluster.2gykfde.mongodb.net/mockevaluation3?retryWrites=true&w=majority'

// const connection = mongoose.connect(url);
const connection = mongoose.connect(MONGO_URL);

module.exports = connection