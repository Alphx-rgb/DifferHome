//jshint esversion:6
require('dotenv').config();
const express = require("express");
const ejs = require("ejs");
const passport = require('passport');
const session = require('express-session');
const passportLocalMongoose = require('passport-local-mongoose');
const multer = require('multer')
const fs = require('fs')
const path = require('path')

const app = express();
app.set('view engine', 'ejs');
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(express.urlencoded({ extended: true }));
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "images");
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    }
  });

// const fileFilter = (req, file, cb) => {
//     if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
//         cb(null, true)
//     }
//     else {
//         cb(null, false)
//     }
// }
// app.use(multer({ storage: storage, fileFilter: fileFilter }).single('image'));
var upload = multer({ storage: storage });
var uploadMultiple = upload.fields([{ name: 'img1', maxCount: 10 }])

app.use(express.static("public"));
app.use('/images', express.static("images"));

app.use(passport.initialize());
app.use(passport.session());

app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    next();
})


const mongoose = require('mongoose');
const { stringify } = require('querystring');
Uri='mongodb://shivang:tyagi25dec@cluster0-shard-00-00.iv8vu.mongodb.net:27017,cluster0-shard-00-01.iv8vu.mongodb.net:27017,cluster0-shard-00-02.iv8vu.mongodb.net:27017/homesDB?ssl=true&replicaSet=atlas-2hn4x7-shard-0&authSource=admin&retryWrites=true&w=majority'
// Uri="mongodb://localhost:27017/homesDB";
mongoose.connect(Uri, { useNewUrlParser: true, useUnifiedTopology: true })


const userSchema = new mongoose.Schema({
    name: String,
    password: String, 
    username: String,
})

userSchema.plugin(passportLocalMongoose);

const User = new mongoose.model('User', userSchema);


passport.use(User.createStrategy());
passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

const productSchema = new mongoose.Schema({
    name:String,
    type1:String,
    type2:String,
    bedroom:Number,
    bathroom:Number,
    price:Number,
    area:Number,
    negotiable:Boolean,
    taxIncluded:Boolean,
    state:String,
    city:String,
    postal:Number,
    locality:String,
    landmark:String,
    xc:Number,
    yc:Number,
    images:[String]
});

const Product = new mongoose.model('Product', productSchema);

//routes----------------------------------------------

app.get('/', function (req, res) {
    res.render('index.ejs')
})

app.post('/register', function (req, res) {
    User.register({ username: req.body.username}, req.body.password, function (err, user) {
        if (err) { console.log(err) }

            res.redirect('/');

    })
})
app.get('/login', function (req, res) {
    res.render('login.ejs');
})

app.post('/login', function (req, res) {
    const user = new User({
        username: req.body.username,
        password: req.body.password
    })
    req.login(user, function (err) {
        if (err) {
            res.render('login');

        }
        else {
            passport.authenticate('local')(req, res, function () {

                if (req.isAuthenticated) {
                    res.redirect('/admin');
                }
            })
        }
    })
})
app.get('/logout', function (req, res) {
    req.logOut();
    res.redirect('/');
})



app.get('/admin',function(req,res){
    if (req.isAuthenticated ) {
        res.render('admins');
    }
})

app.post('/admin', uploadMultiple ,function(req,res){
    let f = [];

    const obj = Object.assign({},req.files);
    arr = obj.img1;
    for(let i=0 ;i<arr.length;i++){
        f.push(arr[i].filename);
    }
    nego = !!req.body.negotiable;
    const data = {
        name:req.body.name,
        type1:req.body.type1,
        type2:req.body.type2,
        bedroom:req.body.bedroom,
        bathroom:req.body.bathroom,
        price:req.body.price,
        area:req.body.area,
        negotiable:nego,
        taxIncluded:req.body.tax,
        state:req.body.state,
        city:req.body.city,
        postal:req.body.code,
        locality:req.body.locality,
        landmark:req.body.landmark,
        xc:req.body.xc,
        yc:req.body.yc,
        images:f
    }

    const newProduct = new Product(data);
    newProduct.save(function(err){
        if(!err){
            res.render('success');
        }
        else{
            console.log(err);
        }
    });
})

//filter--------------------------

app.post('/',function(req,res){
    console.log(req.body);

    Product.find({
        city:req.body.city,
        bedroom:{$in:req.body.bedrooms},
        bathroom:{$in:req.body.bathrooms},
        price:{$gt:req.body.range1[0],$lt:req.body.range2[0]},
        type1:{$in:req.body.type1},
        type2:{$in:req.body.type2},
        area:{$gt:req.body.range1[1],$lt:req.body.range2[1]}

    },function(err,products){
        res.render('page2',{products:products});
    }).sort({x:-1}).limit(6);
})



app.get('/page2',function(req,res){
    console.log(req.body)
    Product.find({},function(err,products){
        res.render('page2',{products:products});
    }).sort({x:-1}).limit(6);
})

app.get('/page3/:id',function(req,res){
    Product.findOne({"_id":req.params.id,},function(err,product){
        res.render('page3',{product:product});
    });
})



// error handling
app.get('/invalid',function(req,res){
    res.status(401)
    res.send('<h1>Invalid<h1>')
})
app.use((req, res) => {
    res.status(404)
    res.send('<h1> 404 not found <h1>')
})

app.listen(process.env.PORT || 3000, function () { console.log('server running on 3000') })
