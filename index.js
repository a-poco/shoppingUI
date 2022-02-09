const express = require('express');
const path = require('path');
const fetch = require('node-fetch')
const { engine } = require('express-handlebars');

const app = express();

app.enable('etag');
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.get('/', (req, res) => {
    res.render('home')
});

const getProducts = async () => {
    const response = await fetch('http://localhost:3001/api/products');
    const data = await response.json();
    const promises = data.map(async (id) => {
        const response = await fetch(`http://localhost:3001/api/products/${id}`)
        const detail = await response.json()
        return detail;
    });
    const result = await Promise.all(promises);
    return result;
}

app.get('/products', async (req, res) => {
    const products = await getProducts();
    res.render('products', {products})
});

app.get('/products/:id', async (req, res) => {
    const id = req.params.id;
    const products = await getProducts();
    const product = products.find(product => product.id === id);
    res.render('productDetails', { products, product })
})

app.use(express.static(path.join(__dirname, '/public')));

// Other middleware follows below...
app.listen(3000);