var express = require('express');
var path = require('path');
var http = require('http');
var config = require('config');
var log = require('libs/log')(module);

var app = express();
app.set('port', config.get('port'));


http.createServer(app).listen(config.get('port'), function() {
  log.info('Server listening on port ' + config.get('port'))
});



//Middleware

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