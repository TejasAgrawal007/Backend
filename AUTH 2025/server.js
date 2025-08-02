const express = require('express')
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const cookieParser = require('cookie-parser')
const app = express()
const port = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.set("view engine", "ejs")

const userModel = require("./models/user");
const dbConnection = require("./config/db")

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/login', (req, res) => {
    res.render('login')
})

app.get('/home', async (req, res) => {

    const token = req.cookies.token;

    if (!token) {
        return res.redirect("/login")
    }

    try {

        const decode = jwt.verify(token, "secret")
        const user = await userModel.findOne({ email: decode.email })


        if (!user) {
            return res.redirect("/login")
        }
        else {
            res.render("home", { username: user.username })
        }

    } catch (error) {
        console.error(error);
        return res.redirect("/login")
    }

})

app.get('/pageNotFound', (req, res) => {
    res.render('pageNotFound')
})


app.post("/create", (req, res) => {

    let { username, email, password, age } = req.body;

    const hash = bcrypt.hashSync(password, 10);

    userModel.create({
        username,
        email,
        password: hash,
        age
    })
    let token = jwt.sign({ email }, "secret")
    res.cookie("token", token);
    res.redirect("/login")
})


app.post("/login", async (req, res) => {

    let user = await userModel.findOne({ email: req.body.email })

    console.log(user)

    if (!user) {
        res.send("Something went wrong...")
    }

    bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (result) {
            let token = jwt.sign({ email: user.email }, "secret")
            res.cookie("token", token);
            res.redirect("home");
        }
        else {
            res.redirect("pageNotFound")
        }
    })

})

app.get("/logout", (req, res) => {
    res.cookie("token", "")
    res.redirect("/")
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
