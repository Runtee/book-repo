const User = require('../models/user')
const Admin = require('../models/admin')

module.exports = async (req, res, next) => {
    const user = await User.findById(req.session.userId)
    const admin = await Admin.findById(req.session.adminId)
    if (!admin && !user){
        console.log('hello')
        return res.redirect('/signin')
    }
    
next()
}