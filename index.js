const express = require('express');
const app = express();
var address = require('./routes/address');

app.set('view engine', 'ejs')

app.use('/I/want/title', address)

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`listening on port ${port}...`)
})