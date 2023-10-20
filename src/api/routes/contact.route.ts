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
 *     Contact:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         address:
 *           type: string
  *         phone:
 *           type: string
 *         message:
 *           type: string
 *       required:
 *         - name
 *         - email
 *         - address
 *         - phone
 *         - message
 */

/**
 * @swagger
 *  /api/v1/contact:
 *   post:
 *     summary: Contact the adminstartors
 *     tags: [Contact]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Contact'
 *     responses:
 *       '201':
 *         description: Contact was sent
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contact'
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
