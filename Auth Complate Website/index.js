const cookieParser = require('cookie-parser')
const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const path = require('path')
const app = express()
const port = 3000

const userModel = require('./models/user');

app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(express.static(path.join(__dirname, 'public')))

app.use(cookieParser())
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/login', (req, res) => {
    res.render('login')
})

app.get('/404', (req, res) => {
    res.render('404')
})

app.get('/home', (req, res) => {
    res.render('home')
})



app.post('/create',  (req, res) => {
    let {username, email, password} = req.body;

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {
            const createUser = await userModel.create({
                username,
                email,
                password : hash,
            })
            // res.send(createUser);
            let token = jwt.sign({email}, "secret")
            res.cookie("token", token)
            res.redirect('login');
        })
    })
})


app.post('/login', async (req, res) => {
    let user = await userModel.findOne({email : req.body.email});
    // console.log(user);

    bcrypt.compare(req.body.password, user.password, (err, result )=>{

        // if(err) res.redirect('404')

        if (result) {
            let token = jwt.sign({email: user.email}, "secret")
            res.cookie("token", token)

            res.redirect('home')
        }else{
            res.redirect('404')
        }
    })
    
    
})

app.get('/logout', (req, res) => {
    res.cookie("token", "")
    res.redirect("/")
})

app.listen(port, () => {
    console.log(`Example app listening on port port`)
})