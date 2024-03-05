const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 6969;

const routes = require('./routes');

app.use(express.static(path.join(__dirname, '../../PerfectApp')));

app.use(bodyParser.json());

app.use('/', routes);

app.listen(port, () => {
    console.log("Server launched on port: ", port);
});
