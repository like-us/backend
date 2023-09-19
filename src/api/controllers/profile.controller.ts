import { NextFunction, Request, Response } from 'express'
import status from 'http-status'
import APIError from '../helpers/APIError'
import paginate from '../helpers/paginate'
import { profileService } from '../services'

const getProfileById = async (req: Request, res: Response, next: NextFunction) => {
        try {
                const profile = await profileService.getProfileById(req.params.id)
                if (!profile) throw new APIError(status.NOT_FOUND, 'profile not found')
                res.json(profile)
        } catch (err) {
                next(err)
        }
}

const getAllProfiles = async (_req: Request, res: Response) => {
        const profiles = await profileService.getAllProfiles()
        res.json(profiles)
}
const getAllRequestedProfiles = async (_req: Request, res: Response) => {
        const profiles = await profileService.getAllRequestedProfiles()
        res.json(profiles)
}


const requestProfile = async (req: Request, res: Response, next: NextFunction) => {
        try {
                const userId = req.params.id;
                if (!userId) {
                        throw new APIError(
                                status.BAD_REQUEST,
                                "Please provide the userid"
                        );
                }
                const requestdProfile = await profileService.requestProfile(userId, req.body)
                res.status(status.CREATED).json(requestdProfile)
        } catch (err) {
                next(err)
        }
}

const grantProfile = async (req: Request, res: Response, next: NextFunction) => {
        try {
                const userId = req.params.id
                if (!userId)
                        throw new APIError(
                                status.BAD_REQUEST,
                                "You can not grant a profile to an invalid user"
                        )

                const profile = await profileService.grantProfile(userId)

                if (!profile)
                        throw new APIError(status.NOT_FOUND, 'User does not have the profile')

                res.status(status.OK).json(profile)
        } catch (err) {
                next(err)
        }
}
const denyProfile = async (req: Request, res: Response, next: NextFunction) => {
        try {
                const userId = req.params.id
                if (!userId)
                        throw new APIError(
                                status.BAD_REQUEST,
                                "You can not deny a profile to an invalid user"
                        )

                await profileService.denyProfile(userId)
                res.status(status.OK).json({ message: "Profile Rejected" })
        } catch (err) {
                next(err)
        }
}

const updateProfile = async (
        req: Request,
        res: Response,
        next: NextFunction
) => {
        try {
                const id = req.params.id
                if (!id)
                        throw new APIError(
                                status.BAD_REQUEST,
                                "You can not grant a profile to an invalid user"
                        )
                const updatedProfile = await profileService.updateProfile(id, {
                        ...req.body,
                })
                if (!updatedProfile)
                        throw new APIError(status.NOT_FOUND, 'User does not have a profile')
                res.status(status.OK).json(updatedProfile)
        } catch (err) {
                next(err)
        }
}

const reviewProfile = async (
        req: Request,
        res: Response,
        next: NextFunction
) => {
        try {
                const id = req.params.id
                if (!id)
                        throw new APIError(
                                status.BAD_REQUEST,
                                "You can not review a profile  of an invalid user"
                        )
                const reviewedProfile = await profileService.reviewProfile(id, {
                        ...req.body,
                })
                if (!reviewedProfile)
                        throw new APIError(status.NOT_FOUND, 'User does not have a profile')
                res.status(status.OK).json(reviewedProfile)
        } catch (err) {
                next(err)
        }
}

const deleteProfile = async (
        req: Request,
        res: Response,
        next: NextFunction
) => {
        try {
                await profileService.deleteProfile(req.params.id)
                res.status(status.NO_CONTENT).end()
        } catch (err) {
                next(err)
        }
}





export default {
        getAllProfiles,
        getProfileById,
        grantProfile,
        updateProfile,
        deleteProfile,
        requestProfile,
        denyProfile,
        reviewProfile,
        getAllRequestedProfiles
}
