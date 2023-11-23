const productRatingsRouter = require('express').Router()

const productRatingsController = require('../../controller/admin/productRatings.controller')

productRatingsRouter.get('/', productRatingsController.getAll)
productRatingsRouter.get('/:id', productRatingsController.detail)
productRatingsRouter.post('/', productRatingsController.create)
productRatingsRouter.patch('/:id', productRatingsController.update)
productRatingsRouter.delete('/:id', productRatingsController.delete)

module.exports = productRatingsRouter