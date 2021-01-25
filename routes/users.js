const express = require('express')
const passport = require('passport')
const {
    validationResult,
    body,
    param
} = require('express-validator')

const utilities = require('../middleware/utilities.js')
const controller = require('../controllers/users.js')
const router = express.Router();

var multer = require('multer')
var upload = multer({
    storage: multer.memoryStorage(),
});

/**
 * @route POST /login
 * @group Users
 * @param {object} object.body - User's Credentials - eg. {"email":"admin@fcm.com", "password":"Teste123"}
 * @returns {object} 200 - Bearer Token
 * @returns {Error} 400 - Unexpected error
 * @returns {Error} 401 - Invalid Credencials
 */
router.post('/login', function (req, res) {
    controller.login(req, res);
})

/**
 * @route POST /facebook
 * @group Users
 * @param {object} object.body - Facebook User's Credentials - eg. {"username": "admin", "email": "admin@fcm.com", "access_token": "access_token"}
 * @returns {object} 200 - Bearer Token
 * @returns {Error} 400 - Unexpected error
 * @returns {Error} 401 - Not Authorized
 */
router.post('/facebook', [
    body('username').notEmpty().escape(),
    body('email').notEmpty().escape(),
    body('access_token').notEmpty().escape(),
], function (req, res) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        controller.loginFacebook(req, res);
    } else {
        res.status(404).json({
            errors: errors.array()
        })
    }
})

/**
 * @route POST /login/google
 * @group Users
 * @param {object} object.body - Google User's Credencials - {"access_token": "access_token"}
 * @returns {object} 200 - Bearer Token
 * @returns {Error} 400 - Unexpected error
 * @returns {Error} 401 - Not Authorized
 */
router.post('/login/google', [
    body('token').notEmpty().escape()
], function (req, res) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        controller.loginGoogle(req, res);
    } else {
        res.status(404).json({
            errors: errors.array()
        })
    }
})

/**
 * @route POST /register
 * @group Users
 * @param {object} object.body - User's Credentials - {"username":"admin", "password":"Teste123", "confirmPassword": "Teste123", "email":"admin@fcm.com"}
 * @returns {object} 200 - Created User
 * @returns {Error} 400 - Unexpected error
 * @returns {Error} 406 - Passwords don't match
 * @returns {Error} 406 - Duplicated User
 */
router.post('/register', [
    body('username').notEmpty().escape(),
    body('password').notEmpty().escape(),
    body('confPassword').notEmpty().escape(),
    body('email').notEmpty().escape(),

], function (req, res) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        controller.register(req, res);
    } else {
        res.status(404).json({
            errors: errors.array()
        })
    }
})


/**
 * @route PUT /profile/{email}
 * @group Users
 * @param {string} email.path - User's Email
 * @param {file} file.formData.required - New user image
 * @returns {object} 200 - image changed
 * @returns {Error} 400 - Unexpected error
 */
router.put('/profile/:email', upload.single('file'),
    function (req, res) {
        const erros = validationResult(req);
        if (erros.isEmpty()) {
            controller.editImage(req, res);
        } else {
            res.status(404).json({
                errors: erros.array()
            })
        }
    })

/**
 * @route GET /profile/{email}
 * @group Users
 * @param {string} email.path - User's Email
 * @returns {string} 200 - User image
 * @returns {Error} 400 - Unexpected error
 */
router.get('/profile/:email', upload.single('file'),
    function (req, res) {
        const erros = validationResult(req);
        if (erros.isEmpty()) {
            controller.getImage(req, res);
        } else {
            res.status(404).json({
                errors: erros.array()
            })
        }
    })


/**
 * @route PUT /pass/{email}
 * @group Users
 * @param {string} email.path - User's Email
 * @param {object} object.body - User Passwords - eg. {"oldPassword":"Teste123", "newPassword":"Teste123"}
 * @returns {object} 200 - Password Changed
 * @returns {Error} 400 - Unexpected error
 * @returns {Error} 406 - Current and new Passwords cannot match
 * @returns {Error} 406 - Old and new Passwords cannot match
 */
router.put('/pass/:email', [
    param('email').notEmpty().escape(),
    body('oldPassword').notEmpty().escape(),
    body('newPassword').notEmpty().escape(),
], function (req, res) {
    const erros = validationResult(req);
    if (erros.isEmpty()) {
        controller.editPassword(req, res);
    } else {
        res.status(404).json({
            errors: erros.array()
        })
    }
})

/**
 * @route PUT /addPass/{email}
 * @group Users
 * @param {string} email.path - User's Email
 * @param {object} object.body - User Passwords - eg. {"newPassword":"Teste123"}
 * @returns {object} 200 - Added Password
 * @returns {Error} 400 - Unexpected error
 */
router.put('/addPass/:email', [
    param('email').notEmpty().escape(),
    body('newPassword').notEmpty().escape(),
], function (req, res) {
    const erros = validationResult(req);
    if (erros.isEmpty()) {
        controller.addPassword(req, res);
    } else {
        res.status(404).json({
            errors: erros.array()
        })
    }
})

/**
 * @route DELETE /delete/{email}
 * @group Users
 * @param {string} email.path - User's Email
 * @returns {object} 200 - Account deleted
 * @returns {Error} 400 - Unexpected error
 */
router.delete('/delete/:email', [
    param('email').notEmpty().escape()
], function (req, res) {
    const erros = validationResult(req);
    if (erros.isEmpty()) {
        controller.removeAccount(req, res);
    } else {
        res.status(404).json({
            errors: erros.array()
        })
    }
})


/**
 * @route GET /spin/{email}
 * @group Users
 * @param {string} email.path - User's Email
 * @returns {object} 200 - Last Spin Date Verified
 * @returns {Error} 400 - Unexpected error
 */
router.get('/spin/:email', [
    param('email').notEmpty().escape(),
], function (req, res) {
    const erros = validationResult(req);
    if (erros.isEmpty()) {
        controller.getSpinDate(req, res);
    } else {
        res.status(404).json({
            errors: erros.array()
        })
    }
})

/**
 * @route PUT /spin/{email}
 * @group Users
 * @param {string} email.path - User's Email
 * @returns {object} 200 - Last Spin Date Changed
 * @returns {Error} 400 - Unexpected error
 */
router.put('/spin/:email', [
    param('email').notEmpty().escape(),
    body('date').notEmpty().escape(),
], function (req, res) {
    const erros = validationResult(req);
    if (erros.isEmpty()) {
        controller.updateSpinDate(req, res);
    } else {
        res.status(404).json({
            errors: erros.array()
        })
    }
})

/**
 * @route PUT /delete/{email}
 * @group Users
 * @param {string} email.path - User's Email
 * @param {object} object.body - User Points - eg. {"points": 30}
 * @returns {object} 200 - User Points Updated
 * @returns {Error} 400 - Unexpected error
 */
router.put('/points/:email', [
    param('email').notEmpty().escape(),
    body('points').notEmpty().escape(),
], function (req, res) {
    const erros = validationResult(req);
    if (erros.isEmpty()) {
        controller.updatePoints(req, res);
    } else {
        res.status(404).json({
            errors: erros.array()
        })
    }
})

/**
 * @route POST /premio
 * @group Users
 * @param {string} email.path - User's Email
 * @param {object} object.body - User Points - eg. {"email": "teste@fcm.com", "type":0}
 * @returns {object} 200 - Email sent to user
 * @returns {Error} 400 - Unexpected error
 */
router.post('/premio', [
    body('email').notEmpty().escape(),
    body('type').notEmpty().escape()
], function (req, res) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        controller.sendEmail(req, res);
    } else {
        res.status(404).json({
            errors: errors.array()
        })
    }
})

module.exports = router