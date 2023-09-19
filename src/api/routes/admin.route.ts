import express from 'express'
import { adminController } from '../controllers'
import validator from '../middlewares/validator'
import { adminValidations, paginateValidations } from '../validations'
import accessControl from '../middlewares/accessControl'

const router = express.Router()

router.post(
	'/',
	accessControl(['SUPER_ADMIN', 'ADMIN']),
	validator.body(adminValidations.newAdmin),
	adminController.createAdmin
)

router.get(
	'/',
	accessControl(['SUPER_ADMIN', 'ADMIN', 'STAFF']),
	adminController.getAllAdmins
)


router.get(
	'/search',
	accessControl('ALL'),
	validator.query(paginateValidations.query),
	adminController.searchAdmin
)

router.get(
	'/:id',
	accessControl(['SUPER_ADMIN', 'ADMIN', 'STAFF']),
	adminController.getAdmin
)

router.put(
	'/:id',
	accessControl(['SUPER_ADMIN', 'ADMIN', 'STAFF']),
	validator.body(adminValidations.updateAdmin),
	adminController.updateAdmin
)


router.delete('/:id', adminController.deleteAdmin)

// suspend admin
export default router
