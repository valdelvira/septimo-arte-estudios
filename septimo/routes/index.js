module.exports = app => {
  app.use('/', require('./base.routes'))
  app.use('/', require('./user.routes'))
  app.use('/', require('./movie.routes'))
  app.use('/', require('./group.routes'))
}

