const express = require('express'),
      path = require('path'),
      fs = require("fs");

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/public/html/index.html`);
});

app.post('/fileCreation', (req, res) => {
  if(req.body.weatherData) {
    fs.writeFile('weatherData.json', JSON.stringify(req.body.weatherData), err => {
      if(err) throw err;
      res.sendStatus(200);
    });
  } else {
    res.sendStatus(400);
  }
});

app.listen(3000);