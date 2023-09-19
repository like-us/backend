import express from 'express'
import validator from '../middlewares/validator'
import { contactValidation } from '../validations'
import { contactController } from '../controllers'

const router = express.Router()
/**
 * @swagger
 * tags:
 *   name: Contact
 *   description: API for managing message sent by user to contact the adminstrators
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Contact:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         email:
 *           type: string
 *           format: email
 *         message:
 *           type: string
 *       required:
 *         - firstName
 *         - lastName
 *         - email
 *         - message
 *
 *     NewContact:
 *       type: object
 *       properties:
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         email:
 *           type: string
 *           format: email
 *         message:
 *           type: string
 *       required:
 *         - firstName
 *         - lastName
 *         - email
 *         - message
 */


/**
 * @swagger
 *  /api/v1/contact:
 *   get:
 *     summary: Get all Contacts
 *     tags: [Contact]
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Contact'
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
router.get(
	'/',
	contactController.getAllContacts
)
/**
 * @swagger
 *  /api/v1/contact/{id}:
 *   get:
 *     summary: Get a contact by ID
 *     tags: [Contact]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the Contact
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful response
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
router.get(
	'/:id',
	contactController.getContact
)

/**
 * @swagger
 *  /api/v1/contact:
 *   post:
 *     summary: Create a new Contact
 *     tags: [Contact]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewContact'
 *     responses:
 *       '201':
 *         description: Contact created
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

/**
 * @swagger
 *  /api/v1/contact/{id}:
 *   put:
 *     summary: Update a Contact
 *     tags: [Contact]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the Contact
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewContact'
 *     responses:
 *       '200':
 *         description: Updated Contact
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
router.put(
	'/:id',
	contactController.updateContact
)

/**
    * @swagger
    *  /api/v1/contact/{id}:
    *   delete:
    *     summary: Delete a Contact
    *     tags: [Contact]
    *     parameters:
    *       - name: id
    *         in: path
    *         description: ID of the Contact
    *         required: true
    *         schema:
    *           type: string
    *     responses:
    *       '204':
    *         description: Contact deleted
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
router.delete(
	'/:id',
	contactController.deleteContact
)

export default router
