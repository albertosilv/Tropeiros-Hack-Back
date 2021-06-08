const mongoose = require('mongoose');
const url="mongodb+srv://tropeiros:nZkCRcCfB8PBhUkx@cluster0.d3jog.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
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