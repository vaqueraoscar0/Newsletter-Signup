const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');


const app = express();


app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req,res) =>{
    res.sendFile(__dirname + "/signup.html")
})

app.post('/', (req,res) =>{
    const fname = req.body.first_name;
    const lname = req.body.last_name;
    const email = req.body.email;

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: fname,
                    LNAME: lname
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data)

    const url = "https://us5.api.mailchimp.com/3.0/lists/AUDIENCE_ID";
    const options = {
        method: "POST",
        auth: "vakera:API_KEY"
    }

    const request = https.request(url, options, function (response) {
        if(response.statusCode === 200){
            res.sendFile(__dirname + "/Success.html")
        }else{
            res.sendFile(__dirname + "/failure.html")
        }

        response.on("data", function (data){
            console.log(JSON.parse(data))
        })
    })

    request.write(jsonData);
    request.end();

})

app.post('/failure', (req,res) =>{
    res.redirect('/')
})

app.listen(process.env.PORT || 3000, (req,res) =>{
    console.log('Server is running on port 3000');
})
