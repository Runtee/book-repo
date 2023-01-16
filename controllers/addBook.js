const Archive = require("../models/archive");
const Request = require("../models/request");

exports.addBook = (req, res, next) => {
    // const form = { ...req.body, uploader: req.session.userId }
    let image = "/database/" + req.files.bookImage[0].filename;
    let file = "/database/" + req.files.file[0].filename;
    let fileExtension = (req.files.file[0].originalname).split(".")
    fileExtension = fileExtension[fileExtension.length - 1]
    console.log(req.session.userId)
    Archive.create({
        ...req.body,
        bookImage: image,
        uploader: req.session.userId,
        extension: fileExtension,
        text_language:req.body.language,
        file: file
    }, (error, user) => {
        console.log(error)
        if (error) {
            const validationErrors = Object.keys(error.errors).map(key =>
                error.errors[key].message)
            req.flash('error', validationErrors)
            req.flash('data', req.body)
            return res.redirect('/upload')
        }
        else {
            console.log(user)
            req.flash('success', 'successfully uploaded')
            res.redirect('/upload')
        }
    })

}
exports.addBookView = (req, res) => {
    res.render('upload', {
        errors: req.flash('error'),
        success: req.flash('success'),
        pageTitle: 'Upload : Research aide'

    }
    )
}
exports.editBook = (req, res) => {
    const form = req.body 
    console.log(form)
    const id = req.params.id
    Archive.findOneAndUpdate({id:id}, {...form,text_language:req.body.language,})
        .then((book) => {
            req.flash("success", "changes has been updated successfully")
            res.redirect('/edit-book/'+id)
        })
        .catch((error) => {
            req.flash("error", error)
            res.redirect('/edit-book/'+id)
        })
}
exports.editBookView = async (req, res) => {
    const book = await Archive.findOne({id:req.param.id})
    res.render('edit', {
        errors: req.flash('error'),
        success: req.flash('success'),
        book: book,
        pageTitle: 'Edit : Research aide'

    }
    )
}
exports.deleteBook = (req, res) => {
    const id = req.params.id
    
    console.log(id)
    Archive.findOneAndDelete({id:id})
        .then((book) => {
            req.flash("success", "book has been deleted successfully")
            res.redirect('/view-uploads/')
        })
        .catch((error) => {
            req.flash("error", error)
            res.redirect('/view-uploads/')
        })
}

exports.requestBook = (req, res, next) => {
    console.log(req.body)
    Request.create(req.body, (error, user) => {
        console.log(error)
        if (error) {
            const validationErrors = Object.keys(error.errors).map(key =>
                error.errors[key].message)
            req.flash('error', validationErrors)
            req.flash('data', req.body)
            return res.redirect('/request')
        }
        else {
            console.log(user)
            req.flash('success', 'successfully requested, the admin will soon add it.')
            res.redirect('/request')
        }
    })

}
exports.requestBookView = (req, res) => {
    res.render('request', {
        errors: req.flash('error'),
        success: req.flash('success'),
        pageTitle: 'Request : Research aide'

    }
    )
}
exports.requestedBook = (req, res) => {
    const form = req.body 
    console.log(form)
    const id = req.params.id
    Request.findOneAndUpdate({id:id}, {status:"added"})
        .then((book) => {
            req.flash("success", "changes has been updated successfully")
            res.redirect('/requested')
        })
        .catch((error) => {
            req.flash("error", error)
            res.redirect('/requested')
        })
}
exports.requestedBookView = async (req, res) => {
    const book = await Request.find({status:"pending"})
    res.render('requested', {
        errors: req.flash('error'),
        success: req.flash('success'),
        books: book,
        pageTitle: 'requested : Research aide'

    }
    )
}