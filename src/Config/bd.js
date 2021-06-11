const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://tropeiros:nZkCRcCfB8PBhUkx@cluster0.d3jog.mongodb.net/myFirstDatabase?retryWrites=true&w=majority" , {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
}, (err) => {
  if (err) console.log(err);
});

mongoose.connection.on('connected', () => {
  console.log("\nAplicação Conectada ao banco de dados!");
})


mongoose.Promise = global.Promise;

module.exports = mongoose;