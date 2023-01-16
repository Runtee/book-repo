const User = require('../models/user')

exports.getAllUsers = async (req, res, next) => {
    // const users = await User.find({})
    const users = await User.aggregate([
        {
          $lookup: {
            from: 'archive',
            localField: '_id',
            foreignField: 'uploader',
            as: 'archive',
          }
        },
        { $unwind: { path: '$archive', preserveNullAndEmptyArrays: true } },
        {
          $group: {
            _id: '$archive.uploader',
            total_uploads: { $sum: 1 },
            name: { "$addToSet": "$name" } ,
            email: { "$addToSet": "$email" } },
          },
        {
          $sort: { total_uploads: -1,  },
        },
      ]);
    res.render('users', {
        errors: req.flash('error'),
        success: req.flash('success'),
        users: users,
        pageTitle: "view users",
        active: "user"

    })
}

exports.deleteUser = async (req, res) => {
    try {
        const id = req.body.id
        await User.findOneAndDelete({ id: id })
        req.flash("success", "successfully removed user")
        return res.redirect("/get-users")
    }
    catch (error) {
        req.flash("error", error)
        console.log(error)
        return res.redirect("/get-users")
    }
};

exports.profileView = async (req, res) => {
    const user = await User.findById(req.session.userId)
    res.render('profile', {
        errors: req.flash('error'),
        user: user,
        success: req.flash('success'),
        pageTitle: 'profile'

    })

}


exports.profile = (req, res) => {
    let Uprofile = {
        name: req.body.name,
        email: req.body.email,
    }
    let id = req.session.userId
    User.findOneAndUpdate({ id: id }, Uprofile, (error, user) => {
        if (error) {
            const validationErrors = Object.keys(error.errors).map(key =>
                error.errors[key].message)
            req.flash('error', validationErrors)
            res.redirect('/profile')
        }
        else {
            req.flash('success', 'Successfully updated your profile')
            res.redirect('/profile')
        }

    })
}