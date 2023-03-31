var server = require("express");
var bodyParser = require("body-parser");
var https = require("https");
var fs = require("fs");
var cheerio = require("cheerio");

var app = server();
app.use(bodyParser.urlencoded({ extended: true }));

//http & async test
async function getWeather(location) {
    var filePath = __dirname + "/index.html";
    var appKey = "07f9f8118aa56d2529d04f64cc7b50f9";
    var unit = "metric";
    var url =
        "https://api.openweathermap.org/data/2.5/weather?q=" +
        location +
        "&appid=" +
        appKey +
        "&units=" +
        unit;

    return new Promise((resolve) => {
        https.get(url, (response) => {
            console.log(response.statusCode);
            response.on("data", (data) => {
                //weather data
                var weatherData = JSON.parse(data);
                var temp = weatherData.main.temp;
                var weatherDescrip = weatherData.weather[0].description;
                var weatherIcon = weatherData.weather[0].icon;
                
                // console.log(location + ' ' + temp + ' ' + weatherDescrip + ' ' + weatherIcon);
                // cheerio test
                fs.readFile(filePath, (err, fileData) => {
                    var $ = cheerio.load(fileData);

                    $("#weatherSample").append(
                        "<li> Weather descript: " +
                            weatherDescrip +
                            "</li>" +
                            "<li> Weather temp: " +
                            temp +
                            "</li>" +
                            '<li><img style="background-color:teal" src="https://openweathermap.org/img/wn/' +
                            weatherIcon +
                            '@2x.png"></li>'
                    );

                    resolve($.html());
                });
            });
        });
    });
}

var location='Paris';
app.get("/", async function (req, res) {
    var site = await getWeather(location);
    res.send(site);
});

// test calc
app.post("/calc", function (req, res) {
    console.log(req.body);
    res.sendFile(__dirname + "/index.html");
});

// test weather
app.post("/weather",async function (req, res) {
    location = req.body.weatherCity;
    res.redirect('/');
});


var port = 4000;
app.listen(port, function () {
    console.log("Server is running on port " + port);
});
