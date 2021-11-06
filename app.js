//jshint esversion:6
require('dotenv').config();
const express = require("express");
const ejs = require("ejs");
const expressSession = require('express-session');
const passport = require('passport');
const session = require('express-session');
const passportLocalMongoose = require('passport-local-mongoose');
const multer = require('multer')
const fs = require('fs')
const path = require('path')

const app = express();
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images')
    },
    filename: (req, file, cb) => {
        cb(null, new Date().getTime().toString() + file.originalname);
    }
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
        cb(null, true)
    }
    else {
        cb(null, false)
    }
}
app.use(multer({ storage: fileStorage, fileFilter: fileFilter }).single('image'))
app.use(express.static("public"));
app.use('/images', express.static("images"));

app.use(passport.initialize());
app.use(passport.session());
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    next();
})


const mongoose = require('mongoose');
const { stringify } = require('querystring');
const Uri='mongodb+srv://Admin:tyagi25dec@cluster0.mjgvd.mongodb.net/homesDB?retryWrites=true&w=majority'
// Uri="mongodb://localhost:27017/homesDB";
mongoose.connect(Uri, { useNewUrlParser: true, useUnifiedTopology: true })

const userSchema = new mongoose.Schema({
    name: String,
    password: String,
    username: String,
    projectName: String,
    discription: String,
    status: String,
    updates: String,
    images: [String],
    phone: {
        type: Number,
        get: v => Math.round(v),
        set: v => Math.round(v)
    }
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

const firstSchema = mongoose.Schema({
    name: String,
    phone: {
        type: Number,
        get: v => Math.round(v),
        set: v => Math.round(v)
    },
    type:String,
    email: String,
    seen: Boolean,
    address: String,
    discription:String
});
const FirstReq = new mongoose.model('Request', firstSchema);

problemSchema = mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    problem: String,
    discription: String
})

const Problem = new mongoose.model('Problem', problemSchema);
//routes----------------------------------------------

app.get('/', function (req, res) {
    res.render('index.ejs')
})

app.get('/login', function (req, res) {
    res.render('login.ejs')
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
                    if(req.session.passport.user == process.env.ADMIN){
                    res.redirect('/admin');
                    }
                    else{
                        res.redirect('/user');
                    }
                }
            })
        }
    })
})

app.get('/admin', function (req, res) {
    if (req.isAuthenticated ) {
        if(req.session.passport.user == process.env.ADMIN){
        FirstReq.find({ seen: false }, function (err, requests) {
            Problem.find({}).populate('user_id').exec(function (err, problems) {
                User.find({status:'running'},function(err,users){
                    res.render('admin.ejs', { data: requests, problems: problems, users:users });
                })
               
            })
        })
    }
    else{res.redirect('/login')}
    }
    else{res.redirect('/login')}
})

app.get('/admin/add-user', function (req, res) {
    if (req.isAuthenticated  ) {
        if(req.session.passport.user == process.env.ADMIN){
        res.render('add-user');
        }
        else{res.redirect('/login')}
    }
    else{res.redirect('/login')}
})

app.get('/admin/project-done/:id', function (req, res) {
    if (req.isAuthenticated ) {
        if(req.session.passport.user == process.env.ADMIN){
        User.updateOne({ _id: req.params.id }, { status: 'Compleated' }, function (err) {
            res.redirect('/admin/all-users')
        })
    }
    else{res.redirect('/login')}
}
else{res.redirect('/login')}
})

app.post('/admin/add-user', function (req, res) {
    if (req.isAuthenticated  ) {
        if(req.session.passport.user == process.env.ADMIN){
        User.register({
            username: req.body.username,
            name: req.body.name,
            projectName: req.body.projectName,
            discription: req.body.discription,
            updates:'',
            images:[],
            status: 'running'
        }, req.body.password, function (err, user) {
            if (err) { console.log(err) }
            else {
                res.redirect('/admin');
            }
        })

    }
    else{res.redirect('/login')}
}
else{res.redirect('/login')}
})
// app.post('/register', function (req, res) {
//     User.register({ username: req.body.username}, req.body.password, function (err, user) {
//         if (err) { console.log(err) }

//             res.redirect('/');

//     })
// })

app.post('/firstform', function (req, res) {
    const data = {
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        address: req.body.address,
        seen: false,
    }
    const newFirst = new FirstReq(data);
    newFirst.save(function (err) {
        if (!err) {
            res.render('success');
        }
    });
})


// app.get('/admin/req-info/:id', function (req, res) {
//     if (req.isAuthenticated ) {
//         if( req.session.passport.user == process.env.ADMIN){
//         FirstReq.findById(req.params.id, function (err, data) {
//             if (!err) {
//                 res.render('req-info', { data: data })

//             }
//         })
//     }
//     else{res.redirect('/login')}
// }ass
// else{res.redirect('/login')}
// })

app.get('/admin/remove-req/:id', function (req, res) {
    if (req.isAuthenticated ) {
        if(req.session.passport.user == process.env.ADMIN){
        const id = req.params.id;
        FirstReq.updateOne({ _id: id }, { seen: true }, function (err) {
            res.redirect('/admin')
        })
    }
    else{res.redirect('/login')}
}
else{res.redirect('/login')}
})

app.get('/admin/all-req', function (req, res) {
    if (req.isAuthenticated) {
        if(req.session.passport.user == process.env.ADMIN){
        FirstReq.find({}, function (err, data) {
            res.render('all-req', { data: data });
        })
    }
    else{res.redirect('/login')}
}
else{res.redirect('/login')}
})

app.get('/user', function (req, res) {
    if (req.isAuthenticated) {
        User.findById(req.session.passport.user, function (err, data) {
            Problem.findOne({ user_id: req.session.passport.user }, function (err, problem) {
                res.render('user', { data: data, problem: problem });
            })

        })
    }
})
app.post('/user/problem', function (req, res) {
    if(req.isAuthenticated){
    const problem = new Problem({
        user_id: req.body.id,
        problem: req.body.problem,
        discription: req.body.discription
    })
    problem.save(function (err) {
        res.redirect('/user');
    })
}
})

app.get('/admin/remove-problem/:id', function (req, res) {
    if (req.isAuthenticated) {
        if(req.session.passport.user == process.env.ADMIN){
    Problem.deleteOne({ _id: req.params.id }, function (err) {
        res.redirect('/admin');
    })
        }
        else{res.redirect('/login')}
}
else{res.redirect('/login')}
})

app.get('/admin/user/:id', (req, res) => {
    if (req.isAuthenticated ) {
        if(req.session.passport.user == process.env.ADMIN){
        User.findById(req.params.id, function (err, data) {
            Problem.findOne({ user_id: req.params.id }, function (err, problem) {
                res.render('admin-user', { data: data, problem: problem });
            })
        })
    }
    else{res.redirect('/login')}
}
else{res.redirect('/login')}
})

app.post('/admin/user/update-progress', (req, res) => {
    if (req.isAuthenticated ) {
        if( req.session.passport.user == process.env.ADMIN){
        User.updateOne({ _id: req.body.id }, { updates: req.body.updates }, function (err) {
            console.log(err)
            res.redirect('/admin/user/' + req.body.id);

        })
    }
    else{res.redirect('/login')}
}
else{res.redirect('/login')}
})

app.post('/admin/user/upload-image', (req, res) => {
   
    if (req.isAuthenticated ) {
        if(req.session.passport.user == process.env.ADMIN){
        User.updateOne({ _id: req.body.id }, {$addToSet: { images: req.file.filename }},(err)=> {
            console.log(err)
            res.redirect('/admin/user/' + req.body.id);
        })
    }
    else{res.redirect('/login')}
}
else{res.redirect('/login')}
})

app.get('/admin/user/delete-image/:id/:img',function(req,res){
    if (req.isAuthenticated  ) {
        if(req.session.passport.user == process.env.ADMIN){
        filepath = path.join('images',req.params.img);
 
    fs.unlink(filepath,(err)=>{
        if (!err){
            User.updateOne({_id:req.params.id},{$pull:{images:req.params.img}},(err)=>{
                res.redirect('/admin/user/' + req.params.id);
            });

        }
    })
    }
    else{res.redirect('/login')}
}
else{res.redirect('/login')}
})

app.get('/admin/all-users', function (req, res) {
    if (req.isAuthenticated  ) {
        if(req.session.passport.user == process.env.ADMIN){
        User.find({}, function (err, data) {
            res.render('all-users', { data });
        })
    }
    else{res.redirect('/login')}
}
else{res.redirect('/login')}
})

app.get('/user/download/:img',function(req,res){
    if (req.isAuthenticated  ) {
    const image = req.params.img
    const imagePath = path.join('images',image)
    console.log(imagePath);
    fs.readFile(imagePath,(err,data)=>{
        if(!err){
            res.setHeader('Content-Type','application/jpg')
            res.setHeader('Content-Disposition','attachment;filename="'+image+'"')
            // attachment,inline
            res.send(data)
        }
        else{console.log(err)}
    })
}
})
app.get('/construction',function(req,res){
    res.render('construction')
})
app.post('/construction',function(req,res){
    const data = {
        type:"construction",
        name:req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        discription:"Type= "+ req.body.type+" Size= "+req.body.size,
        seen: false
    }
    const newFirst = new FirstReq(data);
    newFirst.save(function (err) {
        if (!err) {
            res.render('success');
        }
    });
})
app.get('/buy-plot',function(req,res){
    res.render('buy_plot')
})
app.post('/buy-plot',function(req,res){
    const data = {
        type:"Buy Plot",
        name:req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        discription:"Locality="+ req.body.citytype+" Size="+req.body.size+" City="+req.body.city,
        seen: false
    }
    const newFirst = new FirstReq(data);
    newFirst.save(function (err) {
        if (!err) {
            res.render('success');
        }
    });
})
app.get('/services',function(req,res){
    res.render('services')
})
app.post('/services',function(req,res){
    const data = {
        type:"service",
        name:req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        discription:"Locality="+ req.body.citytype+" Service="+req.body.type+" City="+req.body.city,
        seen: false
    }
    const newFirst = new FirstReq(data);
    newFirst.save(function (err) {
        if (!err) {
            res.render('success');
        }
    });
})
app.get('/resell',function(req,res){
    res.render('resell')
})
app.post('/resell',function(req,res){
    const data = {
        type:"resell",
        name:req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        discription:"Area="+ req.body.area+" Time="+req.body.time+" City="+req.body.city,
        seen: false
    }
    const newFirst = new FirstReq(data);
    newFirst.save(function (err) {
        if (!err) {
            res.render('success');
        }
    });
})
app.get('/about',function(req,res){
    res.render('about');
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
