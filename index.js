const express = require('express');
const app = express();
var address = require('./routes/address');

app.set('view engine', 'ejs')

app.use('/I/want/title', address)

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`listening on port http://localhost:${port}/I/want/title`)
})