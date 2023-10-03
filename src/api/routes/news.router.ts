import express from 'express'
import validator from '../middlewares/validator'
import {
    idValidation,
} from '../validations'
import { newController } from '../controllers'

const router = express.Router()


router.post(
    '/',
    newController.createNews
)



router.get('/',
    newController.getAllNews
)


router.get(
    '/:id',
    validator.params({ id: idValidation }),
    newController.getNewById
)


router.put(
    '/:id',
    validator.params({ id: idValidation }),
    newController.updateNews
)


router.delete(
    '/:id',
    validator.params({ id: idValidation }),
    newController.deleteNews
)
export default router
