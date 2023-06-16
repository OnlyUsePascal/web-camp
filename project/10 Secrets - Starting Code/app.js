const express = require("express");

const app = require('./appNoSession');

const port = 3000;
app.listen(port, () => {
    console.log('listening on port:' + port);
})







