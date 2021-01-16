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




//------------------------------------LOGIN------------------------------------

router.post('/login', function (req, res) {
    controller.login(req, res);
})

//------------------------------------FACEBOOK------------------------------------

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

//------------------------------------GOOGLE------------------------------------

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

//------------------------------------REGISTO------------------------------------

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

//------------------------------------MUDAR-IMAGEM-PERFIL------------------------------------


router.put('/profile/:email', upload.single('file'),
    function (req, res) {
        const erros = validationResult(req);
        if (erros.isEmpty()) {
            console.log(req.file)
            controller.editImage(req, res);
        } else {
            res.status(404).json({
                errors: erros.array()
            })
        }
    })

//------------------------------------MUDAR-PALAVRA-PASSE------------------------------------

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

//------------------------------ADICIONAR-PALAVRA-PASSE(GOOGLE E FACEBOOK ACCOUNTS)------------
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

//--------------------------------------------ELIMINAR-CONTA----------------------------------------
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


module.exports = router