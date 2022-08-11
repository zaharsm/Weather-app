require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const app = express();
app.use(express.static("public"));


app.use(bodyParser.urlencoded({extended:false}));

app.get("/",function(req,res){
    res.sendFile(__dirname + "/index.html");
})


app.post("/",function(req,res){
    var city= req.body.city;
    // var jsonData = JSON.parse(data);
    // console.log(city);

    // var data = JSON.parse(city);

    const api= process.env.API_KEY;
    const url ="https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+api+"&units=metric";

    https.get(url,function(response){
       console.log(response.statusCode);

        response.on("data",function(data){

            const weather = JSON.parse(data);

            const temperature = weather.main.temp;
            const description = weather.weather[0].description;
            const icon = weather.weather[0].icon;

            const iconUrl =  "http://openweathermap.org/img/wn/"+icon+"@2x.png";
            res.write(" <h1>The temperature in "+city+" is "+temperature+" degree Celsius</h1>");
            res.write("<h3>The Weather is Currently " +description+"</h3>");
            res.write("<img src="+iconUrl+"></img>");
            res.send();

    }) 
    
   }); 

})
let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}

app.listen(port,function(){
    console.log("Server started at port 3000");
})

