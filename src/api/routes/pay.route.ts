// import express from 'express'
// import { userController } from '../controllers'
// import validator from '../middlewares/validator'
// import {
// 	idValidation,
// 	userValidations,
// } from '../validations'
// // import accessControl from '../middlewares/accessControl'
// import UserController from '../controllers/testimonial.controller'

// const router = express.Router()


// router.post(
// 	'/',
// 	validator.body(userValidations.newUser),
// 	userController.createUser
// )


// router.get('/',
// 	userController.getAllUsers
// )


// router.get(
// 	'/:id',
// 	validator.params({ id: idValidation }),
// 	userController.getUser   
// )


// router.put(
// 	'/:id',
// 	// accessControl('ALL'),
// 	validator.params({ id: idValidation }),
// 	validator.body(userValidations.updateUser),
// 	userController.updateUser
// )


// router.delete(
// 	'/:id',
// 	// accessControl(['SUPER_ADMIN', 'ADMIN', 'STAFF']),
// 	validator.params({ id: idValidation }),
// 	userController.deleteUser
// )
// export default router
