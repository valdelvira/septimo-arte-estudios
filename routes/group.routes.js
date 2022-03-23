const router = require('express').Router()
const Group = require('../models/Group.model')
const { isLoggedIn, checkRole } = require('../middlewares/route-guard')
const Message = require('../models/Message.model')
const fileUploader = require('../config/cloudinay.config')


router.get('/grupos', isLoggedIn, (req, res, next) => {
    res.render('group/group')
})

router.get('/grupos/crear', isLoggedIn, (req, res, next) => {
    res.render('group/group')
})

router.post('/grupos/crear', isLoggedIn, (req, res, next) => {

    const { groupName, imageURL } = req.body

    Group
        .create({ groupName, imageURL }, { new: true })
        .then(() => res.redirect('/grupos/lista'))
        .catch(err => next(err))
})

router.get('/grupos/lista', isLoggedIn, (req, res, next) => {

    Group
        .find()
        .then(groups => res.render('group/groupList', { groups }))
        .catch(err => next(err))
})

router.get('/grupos/editar/:id', isLoggedIn, (req, res, next) => {
    const { id } = req.params
    Group
        .findById(id)
        .then(group => res.render('group/groupEdit', group))
        .catch(err => next(err))
})

router.post('/grupos/editar/:id', isLoggedIn, fileUploader.single('imageFile'), (req, res, next) => {
    const { id } = req.params
    const { groupName } = req.body
    console.log(req.file.path, id)
    Group
        .findByIdAndUpdate(id, { groupName: groupName, imageURL: req.file.path }, { new: true })
        .then(() => res.redirect('/grupos/lista'))
        .catch(err => next(err))

})

router.post('/grupos/borrar/:id', isLoggedIn, (req, res, next) => {
    const { id } = req.params

    Group
        .findByIdAndDelete(id)
        .then(() => res.redirect('/grupos/lista'))
        .catch(err => next(err))
})

router.post('/grupos/unirse/:id', isLoggedIn, (req, res, next) => {
    const { id } = req.params
    Group
        .findByIdAndUpdate(id, { users: req.session.currentUser._id })
        .then(() => res.redirect('/grupos/lista'))
        .catch(err => next(err))
})

router.get('/grupos/detalles/:id', isLoggedIn, (req, res, next) => {

    const { id } = req.params

    Group
        .findById(id)
        .populate('messages')
        .populate('users')
        .then(group => {
            res.render('group/profile', { group, user: req.session.currentUser._id })
        })
        .catch(err => next(err))

})

router.post('/grupos/mensaje/nuevo/:id', isLoggedIn, (req, res, next) => {
    const { id } = req.params
    const { title, message } = req.body

    Message
        .create({ title, message, user: req.session.currentUser._id })
        .then((mess) => Group.findByIdAndUpdate(id, { $push: { messages: mess.id } }))
        .then(() => res.redirect(`/grupos/detalles/${id}`))
        .catch(err => next(err))
})

module.exports = router