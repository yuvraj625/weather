const express=require("express");
const bodyParser=require("body-parser");
const https=require("https");
const app= express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.get('/',function(req,res){
  res.sendFile(__dirname+'/index.html');

});
app.post('/',function(req,res){
  console.log("post received:");
  const query=(req.body.CityName);

  const api="3079d48a7803b90c7b57f3b08396bf74";
  const url="https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+ api +"&units=metric";
  https.get(url,function(response){
    console.log(response.statusCode);

    response.on("data",function(data){
        const weatherData=JSON.parse(data);
        const temp=weatherData.main.temp;
        const descrip=weatherData.weather[0].description;
        res.write("<h1>Temperature "+temp+" degree celcius.</h1>");
        res.write("<h1>Currently it is "+descrip+".</h1>");
        res.send();
    });
  });
});

  /*const query="Dehradun";
  const api="3079d48a7803b90c7b57f3b08396bf74";
  const url="https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+ api +"&units=metric";
  https.get(url,function(response){
    console.log(response.statusCode);

    response.on("data",function(data){
        const weatherData=JSON.parse(data);
        const temp=weatherData.main.temp;
        const descrip=weatherData.weather[0].description;
        res.write("<h1>Temperature "+temp+" degree celcius.</h1>");
        res.write("<h1>Currently it is "+descrip+".</h1>");
        res.send();
    });
  });*/


app.listen(8080,function(){
  console.log("Initial step done sucessfully");
})
