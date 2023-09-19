import { Profile, User } from '../models'
import APIError from '../helpers/APIError'
import status from 'http-status'
import { NewProfile } from '../interfaces/Profile'
import mailer from '../helpers/mailer'
import { ProfileReview } from '../models'
const getProfileById = (id: string) => {
	return Profile.findOne({ _id: id }).populate("user").populate("services").populate("tradeType").populate("reviews")
}

const getAllProfiles = async () => {
	return Profile.find().populate("user").populate("services").populate("tradeType").populate("reviews")
}
const getAllRequestedProfiles = async () => {
	return Profile.find({ active: false })
}
const requestProfile = async (id: string, body: any) => {
	const user = await User.findById(id);

	if (!user) {
		throw new APIError(status.NOT_FOUND, 'User not found');
	}
	if (user.profile) {
		throw new APIError(status.NOT_ACCEPTABLE, "Already has a profile")
	}

	const phoneNumber: string = body.phoneNumber;

	const profileData = {
		about: '',
		reviews: [],
		ratings: '',
		location: '',
		services: [],
		company: '',
		active: false,
		phoneNumber: phoneNumber,
		user: user.id
	};

	const createdProfile = await Profile.create(profileData);

	user.profile = createdProfile._id;
	await user.save();
	mailer.sendProfileRequestSent(user.email)
	return createProfile
}
const grantProfile = async (id: string) => {
	const user = await User.findById(id);

	if (!user) {
		throw new APIError(status.NOT_FOUND, 'User not found');
	}

	if (!user.profile) {
		throw new APIError(status.NOT_FOUND, 'User does not have a profile');
	}

	const profile = await Profile.findById(user.profile);

	if (!profile) {
		throw new APIError(status.NOT_FOUND, 'Profile not found');
	}

	profile.active = true;
	await profile.save();
	mailer.sendProfileAccepted(user.email)
	return profile
}

const denyProfile = async (id: string) => {
	const user = await User.findById(id);

	if (!user) {
		throw new APIError(status.NOT_FOUND, 'User not found');
	}

	if (!user.profile) {
		throw new APIError(status.NOT_FOUND, 'User does not have a profile');
	}
	await Profile.findByIdAndDelete(user.profile);
	mailer.sendProfileDenied(user.email)

}

const createProfile = async (profile: NewProfile, userId: string) => {
	const user = await User.findById(userId)

	if (!user)
		throw new APIError(
			status.NOT_FOUND,
			`User with id ${userId} does not exist`
		)

	if (user.profile)
		throw new APIError(
			status.BAD_REQUEST,
			`User ${userId} already has a profile`
		)

	const newProfile = new Profile({
		...profile,
	})

	return newProfile.save()
}
const updateProfile = async (id: string, body: Partial<NewProfile>) => {
	const user = await User.findById(id)
	return Profile.findByIdAndUpdate(user?.profile, { ...body }, { new: true })
}
const reviewProfile = async (id: string, body: Partial<NewProfile>) => {
	const user = await User.findById(id)
	const review = new ProfileReview({
		...body
	})
	await review.save()
	const profile = await Profile.findById(user?.profile)
	profile?.reviews.push(review.id)
	const serviceRatings = await ProfileReview.find({
		_id: { $in: profile?.reviews },
	}).select('rating');

	const totalRatings = serviceRatings.length;
	const sumRatings = serviceRatings.reduce((sum, service) => sum + service.rating, 0);
	if (profile) {
		profile.ratings = totalRatings > 0 ? sumRatings / totalRatings : 0;
	}
	await profile?.save()
	return profile
}

const deleteProfile = async (id: string) => {
	const user = await User.findById(id)
	await Profile.findByIdAndDelete(user?.profile)
}
export default {
	getProfileById,
	getAllProfiles,
	createProfile,
	reviewProfile,
	updateProfile,
	deleteProfile,
	requestProfile,
	grantProfile,
	denyProfile,
	getAllRequestedProfiles
}
