const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const routes = require('./routes');
const cors = require('cors');
const moment = require('moment');
moment.locale('id');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(morgan('combined'));
app.use(routes);

app.listen(4001, () => {
  console.log('App listening on port 4001!');
});
