import express from 'express'
import validator from '../middlewares/validator'
import {
    idValidation,
} from '../validations'
import { testimonialController } from '../controllers'

const router = express.Router()


router.post(
    '/',
    testimonialController.createTestimonial
)



router.get('/',
    testimonialController.getAllTestimonial
)


router.get(
    '/:id',
    validator.params({ id: idValidation }),
    testimonialController.getTestimonialById
)


router.put(
    '/:id',
    validator.params({ id: idValidation }),
    testimonialController.updateTestimonial
)


router.delete(
    '/:id',
    validator.params({ id: idValidation }),
    testimonialController.deleteTestimonial
)
export default router
