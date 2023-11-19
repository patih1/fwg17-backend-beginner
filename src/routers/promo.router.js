const promoRouter = require('express').Router()

const promoController = require('../controller/promo.controller')

promoRouter.get('/', promoController.getAll)
promoRouter.get('/:id', promoController.detail)
promoRouter.post('/', promoController.create)
promoRouter.patch('/:id', promoController.update)
promoRouter.delete('/:id', promoController.delete)

module.exports = promoRouter