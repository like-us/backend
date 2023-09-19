import express from 'express'
import validator from '../middlewares/validator'
import { contactValidation, faqValidation } from '../validations'
import { faqController } from '../controllers'
import accessControl from '../middlewares/accessControl'

const router = express.Router()

router.get(
        '/',
        faqController.getAllFaqs
)

router.get(
        '/:id',
        faqController.getFaq
)

router.post(
        '/',
        accessControl(['SUPER_ADMIN', 'ADMIN', 'STAFF']),
        validator.body(faqValidation.createFaq),
        faqController.createFaq
)
/**
 * @swagger
 *  /api/v1/faqs/{id}:
 *   put:
 *     summary: Update a FAQ by changing the answer of it 
 *     tags: [FAQs]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the FAQ
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
 *               answer:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Updated FAQ
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Faq'
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
        accessControl(['SUPER_ADMIN', 'ADMIN', 'STAFF']),
        faqController.updateFaq
)

/**
    * @swagger
    *  /api/v1/faqs/{id}:
    *   delete:
    *     summary: Delete a FAQ
    *     tags: [FAQs]
    *     parameters:
    *       - name: id
    *         in: path
    *         description: ID of the FAQ
    *         required: true
    *         schema:
    *           type: string
    *     responses:
    *       '204':
    *         description: FAQ deleted
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
 *                 error: message
    */
router.delete(
        '/:id',
        accessControl(['SUPER_ADMIN', 'ADMIN', 'STAFF']),
        faqController.deleteFaq
)

export default router















