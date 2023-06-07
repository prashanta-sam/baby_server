var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

var logger = require('morgan');
const fileUpload = require('express-fileupload');
require('./config/connection');







var app = express();
app.use(fileUpload({
  createParentPath: true
}));

// view engine setup
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
require('dotenv').config()
const cors = require("cors");


var corsOptions = {
  origin: ["http://localhost:8000","http://localhost:3000"],
  default:"http://localhost:8000"
};

app.use(cors(corsOptions));

const indexRouter = require('./routes/index');
const productRouter = require('./routes/products');
const UserRoute= require('./routes/UserRoute');



app.use('/', indexRouter);
app.use('/products', productRouter);
app.use('/api/v1/user', UserRoute)
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    console.error(err.message, err.stack);
    res.status(statusCode).json({ message: err.message });
    return;
  });


module.exports = app;
