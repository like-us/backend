import express from 'express'
import validator from '../middlewares/validator'
import { contactValidation, faqValidation, idValidation, profileValidation, userValidations } from '../validations'
import { profileController } from '../controllers'
import accessControl from '../middlewares/accessControl'

const router = express.Router()

router.get(
        '/',
        profileController.getAllProfiles
)

router.get(
        '/requested-profile',
        profileController.getAllRequestedProfiles
)



router.get(
        '/:id',
        validator.params({ id: idValidation }),
        profileController.getProfileById
)

router.post(
        '/request-profile/:id',
        accessControl('ALL'),
        validator.params({ id: idValidation }),
        validator.body(profileValidation.requestProfile),
        profileController.requestProfile
)
router.post(
        '/review/:id',
        // accessControl('ALL'),
        validator.params({ id: idValidation }),
        validator.body(profileValidation.reviewProfile),
        profileController.reviewProfile
)

router.put(
        '/grant-profile/:id',
        accessControl(['SUPER_ADMIN', 'ADMIN', 'STAFF']),
        validator.params({ id: idValidation }),
        profileController.grantProfile
)

router.put(
        '/deny-profile/:id',
        accessControl(['SUPER_ADMIN', 'ADMIN', 'STAFF']),
        validator.params({ id: idValidation }),
        profileController.denyProfile
)





router.put(
        '/:id',
        accessControl('ALL'),
        validator.params({ id: idValidation }),
        validator.body(profileValidation.updateProfile),
        profileController.updateProfile
)



router.delete(
        '/:id',
        accessControl('ALL'),
        validator.params({ id: idValidation }),
        profileController.deleteProfile
)

export default router















