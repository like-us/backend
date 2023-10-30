import express from 'express'
import validator from '../middlewares/validator'
import { idValidation, testimonialValidations } from '../validations'
import { testimonialController } from '../controllers'
import uploader from '../middlewares/upload'

const router = express.Router()

/**
 * @swagger
 * tags:
 *   name: Testimonial
 *   description: API for managing testimonials
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Testimonial:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         phone:
 *           type: string
 *         address:
 *           type: string
 *         shortDescription:
 *           type: string
 *         body:
 *           type: string\
 *         images:
 *           type: array
 *           items:
 *             type: string
 *       required:
 *         - name
 *         - email
 *         - phone
 *         - address
 *         - body
 *         - shortDescription
 */

/**
 * @swagger
 *  /api/v1/testimonials:
 *   get:
 *     summary: Get all testimonials
 *     tags: [Testimonial]
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Faq'
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *               example:
 *                 error:  message
 */
/**
 * @swagger
 *  /api/v1/testimonials/{id}:
 *   get:
 *     summary: Get a testimonial by ID
 *     tags: [Testimonial]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the Testimonial
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Testimonial'
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *               example:
 *                 error:  message
 */
/**
 * @swagger
 *  /api/v1/testimonials:
 *   post:
 *     summary: Create a new Testimonial
 *     tags: [Testimonial]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Testimonial'
 *     responses:
 *       '201':
 *         description: Testimonial created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Testimonial'
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *               example:
 *                 error:  message
 */
/**
 * @swagger
 *  /api/v1/testimonials/{id}:
 *   put:
 *     summary: Update a Testimonial
 *     tags: [Testimonial]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the Testimonial
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               address:
 *                 type: string
 *               email:
 *                 type: string
 *               title:
 *                 type: string
 *               shortDescription:
 *                 type: string
 *               body:
 *                 type: string
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       '200':
 *         description: Updated Testimonial
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Testimonial'
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *               example:
 *                 error: Invalid input data
 */
/**
 * @swagger
 *  /api/v1/testimonials/{id}:
 *   delete:
 *     summary: Delete a Testimonial
 *     tags: [Testimonial]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the Testimonial
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '204':
 *         description: Testimonial deleted
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *               example:
 *                 error:  message
 */

router.post(
  '/',
  uploader,
  (req: any, _: any, next: any) => {
    console.log(req.images)
    next()
  },
  validator.body(testimonialValidations.newTestimonial),
  testimonialController.createTestimonial
)

router.get('/', testimonialController.getAllTestimonial)

router.get(
  '/:id',
  validator.params({ id: idValidation }),
  testimonialController.getTestimonialById
)

router.put(
  '/:id',
  uploader,
  validator.body(testimonialValidations.updateTestimonial),
  validator.params({ id: idValidation }),
  testimonialController.updateTestimonial
)

router.delete(
  '/:id',
  validator.params({ id: idValidation }),
  testimonialController.deleteTestimonial
)
export default router
