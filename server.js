const express = require("express")
const jwt = require("jsonwebtoken")
const app = express()

app.use(express.json())

posts = [
    {
        username: "Shubham",
        title: "Post 1"
    },
    {
        username: "Kumbhare",
        title: "Post 2"
    }
]

app.post("/api/posts", verifyToken, (req, res) => {
    
    jwt.verify(req.token, "secretKey", (err, authData) => {

        if (err) {
            res.sendStatus(403);
        } else {
            res.json({
                message: "Post Created ....",
                authData
            })
        }
    })
})

app.get("/api/login", (req, res) => {
    // Authenticate User

    const user = {
        id: 1,
        username: "Shubham Kumbhare",
        College : "ADIT" 
    }

    jwt.sign({user}, "secretKey", { expiresIn: "30s" } , (err, token) => {
        res.json({
            token
        })
    }) 
})

function verifyToken(req,res,next) {
    const bearerHeader = req.headers['authorization']
    console.log(bearerHeader)

    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(" ")

        const bearerToken = bearer[1]

        req.token = bearerToken
        next()
    } else {
        res.sendStatus(403)
    }
}

app.listen(3000)