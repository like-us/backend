import express from 'express'
import validator from '../middlewares/validator'
import { contactController } from '../controllers'
import { contactValidation } from '../validations'

const router = express.Router()

/**
 * @swagger
 * tags:
 *   name: Contact
 *   description: API for contacting the admins of the appp
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
 *         address:
 *           type: string
 *         title:
 *           type: string
 *         shortDescription:
 *           type: string
 *         images:
 *           type: array
 *           items:
 *             type: string
 *         body:
 *           type: string
 *       required:
 *         - name
 *         - email
 *         - address
 *         - title
 *         - shortDescription
 *         - images
 *         - body
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


router.post(
    '/',
    validator.body(contactValidation.createContact),
    contactController.createContact
)






export default router
