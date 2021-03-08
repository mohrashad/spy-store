const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const homeRouter = require('./routes/home.route');
const productRouter = require('./routes/product.route');
const authRouter = require('./routes/auth.route');
const cartRouter = require('./routes/cart.route');
const orderRouter = require('./routes/order.route');
const adminRouter = require('./routes/admin.route');
const session = require('express-session');
const sessoinStore = require('connect-mongodb-session')(session);
const flash = require('connect-flash');

const app = express();
dotenv.config();

app.use(express.static(path.join(__dirname, 'assets')));
app.use(express.static(path.join(__dirname, 'images')));
const STORE = new sessoinStore({
    uri: process.env.DB_URL,
    collection: 'sessions'
});

app.use(session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    store: STORE,
}));

app.use(flash());

app.set('view engine', 'pug');
app.set('views', 'views');

// use home router
app.use('/', homeRouter);

// use authntication router
app.use('/', authRouter);

// use product router
app.use('/product', productRouter);

// use cart router
app.use('/cart', cartRouter);

// use order router
app.use('/orders', orderRouter)

// use admin router
app.use('/admin', adminRouter);

// error page router
app.get('/error', (req, res, next) => {
    res.status(505).render('error', {
        isAdmin: req.session.isAdmin,
        isUser: req.session.userId
    });

    next();
});

// not admin router
app.get('/not-admin', (req, res) => {
    res.status(403).render('not-admin', {
        isAdmin: false,
        isUser: req.session.userId
    });
});

app.use((err, req, res, next) => {
    res.redirect('/error');
});

app.use((req, res) => {
    res.status(404).render('not found', {
        isUser: req.session.userId,
        isAdmin: req.session.isAdmin
    })
});

const port = process.env.PORT || 3000
app.listen(port, (err) => console.log(`server start on port ${port}`));