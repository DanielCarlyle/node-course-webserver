const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials')

//set express-related configurations
app.set('view engine', 'hbs');

//request and response object and next - next exists so you can tell middleware when it is done*****
app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  //next tells express when we are done, only when we call next will the app continue to run
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('unable to append to server log.');
    }
  });
  next();
});


//app.use((req, res, next) => {
  //res.render('maintenance.hbs');
//});

//middleware ___dirname stores the path to your file directory
app.use(express.static(__dirname + '/public'));


hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
})

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
})


//sets up a handler for an http request
//app.get('/', (req, res) => {
  //res.send('<h1>hello this is using express</h1>');
//});

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    pageCopy: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  });
});

//we can specify as many routes as we want
app.get('/about', (req, res) => {
  //render allows you to render any templates set up in view engine
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });
});


//we can specify as many routes as we want
app.get('/portfolio', (req, res) => {
  //render allows you to render any templates set up in view engine
  res.render('portfolio.hbs', {
    pageTitle: 'Portfolio Page'
  });
});


//we can specify as many routes as we want
app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'unable to handle request'
  });
});


//binds the application to a port on our machine
app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
