const ApiHandler = require('../api/api_movies.handler')
const router = require('express').Router()
const handler = new ApiHandler()
const User = require('./../models/User.model')
const { isLoggedIn, checkRole } = require('../middlewares/route-guard')
const { isUserLoged } = require("../utils")

router.post('/buscar', (req, res, next) => {
    const {query} = req.body

    handler.searchMovie(query)
        .then(movies => {
            let results = movies.data.results
            res.render('index', {results})
        })
        .catch(err => next(err))
})


router.get('/buscar-pelicula', isLoggedIn, (req, res, next) => {
    res.render('movies/movies')
})

router.post('/buscar-pelicula', isLoggedIn, (req, res, next) => {
    const {query} = req.body
    handler.searchMovie(query)
        .then(movies => {
            let {results} = movies.data
            res.render('movies/moviesadd', {
                results,
                isUserLoged: isUserLoged(req.session.currentUser),
            })
        })
        .catch(err => next(err))
})

router.post('/peliculafavorita/:id', isLoggedIn, (req, res, next) => {
    const {id} = req.params
    User
        .findByIdAndUpdate(req.session.currentUser._id, { $push: {favoritesMovies:id}})
        .then(() => res.redirect('/perfil'))
        .catch(err => next(err))
})


module.exports = router;