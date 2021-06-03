const mongoose = require('mongoose');
const url=""
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
}, (err) => {
  if (err) console.log(err);
});


mongoose.Promise = global.Promise;

module.exports = mongoose;