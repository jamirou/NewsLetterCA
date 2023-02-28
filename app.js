//jshint esversion: 6 

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https")

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res) {
    const firstName = req.body.Fname;
    const lastName = req.body.Lname;
    const email = req.body.email;
    // console.log(firstName, lastName, email);

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    Fname: firstName,
                    Lname: lastName
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);

    const url = "https://us9.api.mailchimp.com/3.0/lists/51e7ed6b55"

    const options = {
        method: "POST",
        auth:"Jamiro1:e3f34d544ca42a1bbb3328bf54a64136-us9"
    }
    
    const request = https.request(url, options, function(response) {

        if(response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html");
        } else {
            res.sendFile(__dirname + "/failure.html");
        };

        response.on("data", function(data) {
            console.log(JSON.parse(data));
        });
    });

    // request.write(jsonData);
    request.end();

});

app.post("/failure.html", function(req, res) {
    res.redirect("/");
});

app.listen(process.env.PORT || 3000, function() {
    console.log("Your server is running on port 3000");
});

// API KEY
// e3f34d544ca42a1bbb3328bf54a64136-us9

// List id
// 51e7ed6b55