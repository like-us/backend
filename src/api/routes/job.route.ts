import express from 'express'
import validator from '../middlewares/validator'
import {
	idValidation,
	jobValidations,
	paginateValidations,
} from '../validations'
import { jobController } from '../controllers'
import accessControl from '../middlewares/accessControl'

const router = express.Router()

router.post('/',
	validator.body(jobValidations.newJob),
	jobController.createJob
)

router.get(
	'/user/:id',
	validator.params({ id: idValidation }),
	accessControl('ALL'),
	jobController.getJobsForUser
)



router.post(
	'/:id/bid',
	validator.params({ id: idValidation }),
	accessControl(['USER']),
	jobController.bidOnJob
)


router.get('/', jobController.getAllJobs)

router.get(
	'/search',
	accessControl('ALL'),
	validator.query(paginateValidations.query),
	jobController.searchJob
)


router.get('/:id', validator.params({ id: idValidation }), jobController.getJob)

router.put(
	'/:id',
	validator.body(jobValidations.updateJob),
	jobController.updateJob
)


router.delete('/:id', jobController.deleteJob)

export default router
