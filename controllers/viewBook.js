const Archive = require("../models/archive");
const path = require("path")
exports.search = async (req, res) => {
    try {
        const text = req.query.text
        let searchResult;
        if (text && req.query.type) {
            searchResult = await Archive.aggregate(
                [
                    { $match: { $text: { $search: text } } },
                    { $match: { type: req.query.type } },

                    {
                        $addFields: { score: { $meta: "textScore" } },
                    },
                    { $match: { score: { $gt: 1.0 } } }
                ]
            )
        }
        else if (text && !req.query.type) {
            searchResult = await Archive.aggregate(
                [
                    { $match: { $text: { $search: text } } },
                    {
                        $addFields: { score: { $meta: "textScore" } },
                    },
                    { $sort: { score: 1} }
                ]
            )
        }
        else {
            var featured = await Archive.find({})
        };
        console.log(searchResult)
        res.render('search', {
            books: searchResult ? searchResult : "",
            pageTitle: 'search',
            featured: featured
        })

    }

    catch (error) {
        req.flash("error", error)
        console.log(error)
        res.render('search', {
            pageTitle: 'search',
            error: error
        })
    }
}
exports.viewBook = async (req, res) => {
    const id = req.params.id
    Archive.findOne({ id: id })
        .then((book) => {
            res.render("book", {
                book: book,
                pageTitle: 'book'
            })
        })
        .catch((error) => {
            req.flash("error", error)
            res.render("404", {
                error: req.flash("error")
            })
        })
}
exports.viewUpload = async (req, res) => {
    const books = await Archive.find({ uploader: req.session.userId })
    res.render("viewBooks", {
        books: books,
        pageTitle: "books",
        errors: req.flash('error'),
        success: req.flash('success'),
    })
}
exports.viewAllUpload = async (req, res) => {
    const books = await Archive.find({}).populate("uploader")
    res.render("viewAllBooks", {
        books: books,
        pageTitle: "books",
        errors: req.flash('error'),
        success: req.flash('success'),

    })
}
exports.download = async (req,res)=>{
    const id = req.params.id
    Archive.findOne({ id: id })
        .then((book) => {
            
            res.download(path.join(__dirname,"../",book.file))
        })
        .catch((error) => {
            console.log(error)
        })
    }
