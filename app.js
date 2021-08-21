const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"))

app.get('/', (req,res) =>{
    res.sendFile(__dirname + "/signup.html")
})

app.post('/', (req,res) =>{
    const name = req.body.first_name;
    const lastName = req.body.last_name;
    const email = req.body.email;
    console.log('First Name',name)
    console.log('Last Name:',lastName)
    console.log('Email', email)
})

app.listen(3000, (req,res) =>{
    console.log('Server is running on port 3000');
})