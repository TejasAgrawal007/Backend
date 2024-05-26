const path = require('path')
const bcrypt = require('bcrypt')
const express = require('express')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const app = express()
const port = 3000

const userModel = require('./models/user')

app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(express.static(path.join(__dirname, 'public')))


app.use(cookieParser())
app.set('view engine', 'ejs')


app.get('/', (req, res) => {
    res.render('index')
})

/*
app.post('/create',  (req, res) => {

    let {username, email, password, age} = req.body; 

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {
            const createUser = await userModel.create({
                username,
                email,
                password: hash ,
                age,
            })

            let token = jwt.sign({email}, "secret");
            res.cookie("token" , token)
            res.send(createUser);
        })
    });
})


app.post('/login', async (req, res) => {
    res.render("login");
})

app.post('/login', async (req, res) => {
    // res.render("login");
    let user = await userModel.findOne({email : req.body.email})
    console.log(user);
})

app.get('/logout', (req, res) => {
    res.cookie("token", "");
    res.redirect("/")
})*/


app.post('/create',  (req, res) => {
    
    let {username, email, password, age} = req.body;

    bcrypt.genSalt(10, salt,   (err, salt) => {
        bcrypt.hash(password, salt, async (err, salt) => {
            const createUser = await  userModel.create({
                username, 
                email,
                password,
                age,
            })
            res.send(createUser);
        })
    })
})

app.listen(port, () => {
    console.log(`Example app listening on port port`)
})