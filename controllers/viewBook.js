const Archive = require("../models/archive");

exports.search = (req, res) => {
    Archive.find({})
        .then((book) => {
            res.render('search',{
                book:book
            })
        })
        .catch((error) => {
            req.flash("error", error)
            res.render('search',{
                error:error
            })
        })
}
exports.viewBook = async (req, res) => {
    const id = req.params.id
    Archive.find({ id: id })
        .then((book) => {
            res.render("book", {
                book: book
            })
        })
        .catch((error) => {
            req.flash("error", error)
            res.render("404",{
                error: req.flash("error")
            })
        })
}
exports.homepage = (req, res) => {
    res.render("home")
}
