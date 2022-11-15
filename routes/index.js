const express = require('express');
const authController = require("../controllers/auth")
const addController = require("../controllers/addBook")
const BookController = require("../controllers/viewBook")

const router = express.Router();

router.get('/signin', authController.signinView);
router.get('/signup', authController.signupView);
router.post('/signin', authController.login);
router.post('/signup', authController.signup);
router.get('/', authController.home);
// router.get('/admin',authController.signinViewAdmin );
// router.post('/admin',authController.loginAdmin );

router.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/')
    })
})

module.exports = router;