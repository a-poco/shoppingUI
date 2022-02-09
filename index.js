const express = require('express');

const { engine } = require('express-handlebars');

const app = express();

app.enable('etag');
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.get('/', (req, res) => {
    res.render('home')
})

// Other middleware follows below...
app.listen(3000);