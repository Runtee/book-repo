const express = require('express');
const multer = require('multer')
const path = require('path')

// const upload = multer({ dest: path.resolve(__dirname, '..', 'datebase/files') })
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(__dirname, '..', 'database'))
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now()
        cb(null, file.fieldname +uniqueSuffix+file.originalname )
      }
  })

const upload = multer({ storage: storage })
const authController = require("../controllers/auth")
const addController = require("../controllers/addBook")
const bookController = require("../controllers/viewBook")
const userController = require("../controllers/user");
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();


const cpUpload = upload.fields([{ name: 'file', maxCount: 1 }, { name: 'bookImage', maxCount: 1 }])

router.get('/signin', authController.signinView);
router.get('/signup', authController.signupView);
router.post('/signin', authController.login);
router.post('/signup', authController.signup);
router.get('/', authController.home);
router.get("/search", bookController.search)
router.get("/book/:id", bookController.viewBook)
router.get("/download/:id", bookController.download)
router.get("/upload", authMiddleware, addController.addBookView)
router.post("/upload", authMiddleware, cpUpload, addController.addBook)
router.get("/edit-book/:id", authMiddleware, addController.editBookView)
router.post("/edit-book/:id", authMiddleware, addController.editBook)
router.post("/delete-book/:id", authMiddleware, addController.deleteBook)
router.get("/view-uploads", authMiddleware, bookController.viewUpload)
router.get("/view-all-uploads", authMiddleware, bookController.viewAllUpload)
router.get("/view-users", authMiddleware, userController.getAllUsers)
router.post("/delete-user/:id", authMiddleware, userController.deleteUser)
router.get("/profile", authMiddleware, userController.profileView)
router.post("/profile", authMiddleware, userController.profile)

router.get("/request",authMiddleware, addController.requestBookView)
router.post("/request",authMiddleware, addController.requestBook)
router.get("/requested", authMiddleware, addController.requestedBookView)
router.get("/requested/:id", authMiddleware, addController.requestedBook)

router.get('/admin',authController.signinViewAdmin );
router.post('/admin',authController.loginAdmin );

router.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/')
    })
})

module.exports = router;