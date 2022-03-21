const router = require('express').Router()
const User = require('../models/User.model')
const { isAdmin, isUser } = require("../utils")
const { isLoggedIn, checkRole } = require('../middlewares/route-guard')
const ApiHandler = require('../api/api_movies.handler')
const handler = new ApiHandler()
const fileUploader = require('../config/cloudinay.config')
const bcryptjs = require('bcryptjs')
let results = []


router.get('/perfil', isLoggedIn, (req, res, next) => {
    User
        .findById(req.session.currentUser._id)
        .then(user => {

            let promises = user.favoritesMovies.map(movieId => handler.searchMovie(movieId))
            
            if(promises){
            Promise
            .all(promises)
            .then(responses => {
                const result = responses.map(elm => elm.data.results)
                const moviesData = result.map(elm=> elm[0])
                res.render('auth/profile', {user, moviesData})
            })} else {
                res.render('auth/profile', { user })
            }
        })
        .catch(err => next(err))
})

router.get('/perfil/editar/:id', isLoggedIn, (req, res, next) => {
    const { id } = req.params
    User
        .findById(id)
        .then(user => res.render("user/edit", {
            user,
            isAdmin: isAdmin(req.session.currentUser),
        }))
        .catch(err => next(err))
})

router.post('/perfil/editar/:id', isLoggedIn, fileUploader.single('imageFile'), (req, res, next) => {
    const { id } = req.params
    const { username, email, birth, sex } = req.body
    
    User
        .findByIdAndUpdate(id, { username, email, birth, sex, imageURL: req.file.path }, { new: true })
        .then(() => res.redirect('/'))
        .catch(err => next(err))
})

router.get('/perfil/user/lista', isLoggedIn, checkRole('ADMIN'), (req, res, next) => {

    User
        .find()
        .then(userList => res.render('user/list', { userList }))
        .catch(err => next(err))
})


router.post('/perfil/borrar/:id', isLoggedIn, checkRole('ADMIN'), (req, res, next) => {
    const { id } = req.params

    User
        .findByIdAndDelete(id)
        .then(() => res.redirect("/perfil/user/lista"))
        .catch(err => next(err))
})

router.post('/perfil/nuevoamigo/:userid/:groupid', (req, res, next) => {
    const { userid, groupid } = req.params
  
    User
        .findByIdAndUpdate(req.session.currentUser._id, { $push: { friends: userid } })
        .then(() => res.redirect(`/grupos/detalles/${groupid}`))
        .catch(err => next(err))
})

module.exports = router;
