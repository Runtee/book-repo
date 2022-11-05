const flash = require('connect-flash');
const express = require('express');
const path = require('path');
const expressSession = require('express-session');
const mongoose = require('mongoose')
const app = express();
const fileUpload = require('express-fileupload')



app.set('view engine', 'ejs');
app.set('views', 'views');
mongoose.connect('mongodb://localhost:27017/rewardsdb',
    { useNewUrlParser: true, useUnifiedTopology: true }, (err, db) => {
        if (db) {
            console.log('database connected successfully')
        }
        if (err) {
            console.log(err);
        }
    });
app.use(expressSession({
    secret: 'danceingcat',
    saveUninitialized: true,
    resave: true
}));

app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());
app.use(fileUpload())
app.use(express.json())
sapp.use(express.urlencoded())
app.use((req, res, next) => {
    res.status(404).render('404', { pageTitle: 'Page Not Found' });
next()
})


app.listen(3000, () => {
    console.log('listening on port 3000');
});