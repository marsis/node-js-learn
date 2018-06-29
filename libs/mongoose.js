const mongoose = require('mongoose');

var config = require('config')
mongoose.connect(config.get('mongoose:uro'), config.get('mongoose:options'));

module.exports = mongoose;