const express = require('express');
var cors = require('cors')
require('dotenv').config()


const connection = require('./config/db');
const ProductRouter = require('./Routes/productRoutes')


const app = express();
app.use(express.json())
app.use(cors());


app.get('/', (req, res) => {
    res.status(200).json({ message: "Base route" })
})


app.use('/products', ProductRouter)




// let PORT = process.env.PORT || 8090

let PORT = 8000;

app.listen(PORT, async () => {
    try {
        await connection
        console.log('db is working')
    } catch (error) {
        console.log(error)
    }
    console.log(`listening on port ${PORT}`);
})