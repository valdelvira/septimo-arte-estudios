const isLoggedIn = (req, res, next) => {
    if (!req.session.currentUser) {
        res.redirect('/acceso')
        return
    }
    next();
}

const checkRole = (...admittedRoles) => (req, res, next) => {
    admittedRoles.includes(req.session.currentUser.role) ? next() : res.redirect('/perfil')
}

module.exports = { isLoggedIn, checkRole }