const express = require('express')
const router = express.Router()

const proController = require('../controllers/product.controller')

const fileuploadMiddleware = require('../middlewares/fileupload')
router.route('/list')
  .post(fileuploadMiddleware.fileupload, proController.save)
  .get(proController.find)
  .delete(proController.remove)
router.route('/:id').post(proController.findById);
router.route('/update/:id').post(fileuploadMiddleware.fileupload,proController.update);
router.route('/search/:keyword').post(proController.search);
module.exports = router
