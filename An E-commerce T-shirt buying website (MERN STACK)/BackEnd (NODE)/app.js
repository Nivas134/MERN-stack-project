const mongoose = require('mongoose')
const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const authRoutes = require('./routes/Authentication');
const userRoutes = require('./routes/user');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');
const ordertRoutes = require('./routes/order');
const paymentRoutes = require('./routes/payment');


const app = express();

// DB connection
mongoose.set('useCreateIndex', true);

mongoose.connect(process.env.db, {useNewUrlParser:true, useUnifiedTopology: true, useCreateIndex: true}).then(() =>{
    console.log("Connected to database")
}).catch(()=>{
    console.log('some error occured');
});

//Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//My routes
app.use('/api',authRoutes);
app.use('/api',userRoutes);
app.use('/api',categoryRoutes);
app.use('/api',productRoutes);
app.use('/api',ordertRoutes);
app.use('/api',paymentRoutes);

const port = process.env.PORT || 3000

app.listen(port,() => {
    console.log ('app is listening on port 3000')
});