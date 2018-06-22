var express = require('express');
var path = require('path');
var http = require('http');
var config = require('config');
var log = require('libs/log')(module);

var router = express.Router();

var app = express();

var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var logger = require('logger');
var errorhandler = require('errorhandler')

var cookieParser = require('cookie-parser')

//Middleware


app.engine('ejs', require('ejs-locals')); //layout partial block
app.set('views', __dirname + '/templates') //папка с шаблонами
app.set('view engine', 'ejs'); //ejs - шаблонизатор

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
/*if (app.get('env') == 'development') {
    app.use(logger.createLogger('dev')); //res.end
} else {
    app.use(logger.createLogger('default'));
}*/

app.use(bodyParser.json()); //разбирает тело запроса form json, post req.body

app.use(cookieParser())//req.cookies

/*app.use(app.router);

app.get('/', function(req, res, next) {
    res.end("Test");
});*/

app.use(router);

router.get('/error', function(req, res, next) {
    // here we cause an error in the pipeline so we see express-winston in action.
    return next(new Error("This is an error and it should be logged to the console"));
});

router.get('/', function(req, res, next) {
   // res.render('This is a normal request, it should be logged to the console too');
    res.render("index", {

    });
});


app.use(express.static(path.join(__dirname, 'public')));


app.use(function (err, req, res, next) {
    // NODE_ENV = 'production'
    if (app.get('env') == 'development') {
      var errorHandler = express.errorHandler();
       app.use(errorhandler())

    } else {
      res.send(500);
    }
});

/*

app.use(function(req, res, next) {
  if(req.url == '/') {
    res.end('Hello')
  } else {}
  //console.log();
  next()
});

app.use(function(req, res, next) {
  if(req.url == '/test') {
    res.end('Test');
  } else {
    next();
  }
});
app.use(function(req, res, next) {
  res.status(404).send('Page not found')


});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
*/


http.createServer(app).listen(config.get('port'), function() {
    log.info('Server listening on port ' + config.get('port'))
});

