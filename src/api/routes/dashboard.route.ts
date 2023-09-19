import express from 'express'
import accessControl from '../middlewares/accessControl'
import { dashboardController } from '../controllers'

const router = express.Router()

router.get(
	'/stats',
	accessControl(['SUPER_ADMIN', 'ADMIN']),
	dashboardController.stats
)

export default router
