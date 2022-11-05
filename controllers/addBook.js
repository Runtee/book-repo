const Archive = require("../models/archive");

exports.addBook = (req, res) => {
    Archive.create(req.body)
        .then((book) => {
            res.redirect('/add-book')
        })
        .catch((error) => {
            req.flash("error",error)
            res.redirect('/add-book')
        })
}