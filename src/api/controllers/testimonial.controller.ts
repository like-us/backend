import { NextFunction, Request, Response } from 'express'
import { testimonialService } from '../services'
import status from 'http-status'
import APIError from '../helpers/APIError'
import cloudinary from "cloudinary"

const getTestimonialById = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const testimonial = await testimonialService.getTestimonialById(req.params.id)
		if (!testimonial) throw new APIError(status.NOT_FOUND, 'Testimonial not found')
		res.json(testimonial)
	} catch (err) {
		next(err)
	}
}

const getAllTestimonial = async (_req: Request, res: Response) => {
	const testimonials = await testimonialService.getAllTestimonial()
	res.json(testimonials)
}

const createTestimonial = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { body } = req;
		const image = await cloudinary.v2.uploader.upload(body.image, {
			folder: "images",
			resource_type: "auto",
		});
		const img = image.secure_url;
		const testimonial = await testimonialService.createTestimonial({ ...body, image:img })
		res.status(status.CREATED).json(testimonial)
	} catch (err) {
		next(err)
	}
}

const updateTestimonial = async (
	req: any,
	res: Response,
	next: NextFunction
) => {
	try {
		const id = req.params.id
		const { body } = req
		const testimonial = await testimonialService.updateTestimonial(id, body)
		if (!testimonial)
			throw new APIError(status.NOT_FOUND, 'Testimonial does not exist')
		res.status(status.OK).json(testimonial)
	} catch (err) {
		next(err)
	}
}

const deleteTestimonial = async (
	req: any,
	res: Response,
	next: NextFunction
) => {
	try {
		await testimonialService.deleteTestimonial(req.params.id)
		res.status(status.NO_CONTENT).end()
	} catch (err) {
		next(err)
	}
}


export default {
	getTestimonialById,
	getAllTestimonial,
	createTestimonial,
	updateTestimonial,
	deleteTestimonial
}
