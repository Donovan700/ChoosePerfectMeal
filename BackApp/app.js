const express = require('express');
const app = express();
const port = 6969;

const routes = require('./routes');

app.use('/', routes);

app.listen(port, () => {
    console.log("Server launched on port: ", port);
});
