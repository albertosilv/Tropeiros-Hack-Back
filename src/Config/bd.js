const mongoose = require('mongoose');
mongoose.connect(process.env.SECRET , {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
}, (err) => {
  if (err) console.log(err);
});


mongoose.Promise = global.Promise;

module.exports = mongoose;