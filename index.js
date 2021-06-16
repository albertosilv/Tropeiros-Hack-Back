require('dotenv/config');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const user = require('./src/Routers/UserRouter');
const accidents = require('./src/Routers/AccidentsRouter');
const filtering = require('./src/Routers/FilteringRouter')
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(morgan('dev'))

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Connection, authorization');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    next();
});

app.use('/user',user);
app.use('/accidents',accidents)
app.use('/filter',filtering)


const port = process.env.PORT || 4000

app.listen(port, () => {
    console.log('Server listening on port ' + port);
})