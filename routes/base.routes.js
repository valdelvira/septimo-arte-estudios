const router = require('express').Router()
const bcryptjs = require('bcryptjs')
const User = require('./../models/User.model')

const saltRounds = 10

router.get('/', (req, res, next) => {
    res.render('index');
});

router.post('/', (req, res, next) => {
    res.render('index');
});

router.get('/registro', (req, res, next) => {
    res.render('auth/sign-up')
})

router.post('/registro', (req, res, next) => {

    const { username, userPwd, favoritesMovies, email, birth, sex } = req.body

    bcryptjs
        .genSalt(saltRounds)
        .then(salt => bcryptjs.hash(userPwd, saltRounds))
        .then(password => User.create({ username, password, favoritesMovies, email, birth, sex }))
        .then(createdUser => res.redirect('/'))
        .catch(error => next(error))
})


router.get('/acceso', (req, res, next) => res.render('auth/login'))

router.post('/acceso', (req, res, next) => {

    const { username, userPwd } = req.body

    if (username.length === 0 || userPwd.length === 0) {
        res.render('auth/login', { errorMessage: 'Por favor, rellena todos los campos' })
        return
    }

    User
        .findOne({ username })
        .then(user => {
            if (!user) {
                res.render('auth/login', { errorMessage: 'Email no registrado en la Base de Datos' })
                return
            } else if (bcryptjs.compareSync(userPwd, user.password) === false) {
                res.render('auth/login', { errorMessage: 'La contraseña es incorrecta' })
                return
            } else {
                req.session.currentUser = user
                res.redirect('/perfil')
            }
        })
})

router.post('/acceso', (req, res, next) => {
    const { username, password } = req.body
})

router.post('/cerrar-sesion', (req, res) => {
    req.session.destroy(() => res.redirect('/acceso'))
})


module.exports = router
