const Admin = require('../models/admin')
module.exports = (req, res, next) => {
    Admin.findById(req.session.adminId, (error, user) => {
        if (error || !user)
            return res.redirect('/admin')
        next()
    })
}