import express from 'express'
import validator from '../middlewares/validator'
import {
    idValidation,
} from '../validations'
import { newController } from '../controllers'

const router = express.Router()

/**
 * @swagger
 * tags:
 *   name:  NewsUpdates
 *   description: API for managing CRUP operations on news
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     New:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *         shortDescription:
 *           type: string
 *         body:
 *           type: string
 *       required:
 *         - title
 *         - shortDescription
 *         - body
 *         - category
 *         - link
 *         - image
 */
/**
 * @swagger
 *  /api/v1/news:
 *   get:
 *     summary: Get all  News
 *     tags: [NewsUpdates]
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/New'
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
 *  /api/v1/news/{id}:
 *   get:
 *     summary: Get a  new by ID
 *     tags: [NewsUpdates]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the New
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/New'
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
 *  /api/v1/news:
 *   post:
 *     summary: Create a new 
 *     tags: [NewsUpdates]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/New'
 *     responses:
 *       '201':
 *         description:  New was created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/New'
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
 *  /api/v1/news/{id}:
 *   put:
 *     summary: Update a  New
 *     tags: [NewsUpdates]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the  New
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
 *               title:
 *                 type: string
  *               shortDescription:
 *                 type: string
  *               body:
 *                 type: string
  *               category:
 *                 type: string
   *               link:
 *                 type: string
   *               image:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Updated New
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/New'
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
    *  /api/v1/news/{id}:
    *   delete:
    *     summary: Delete a New
    *     tags: [NewsUpdates]
    *     parameters:
    *       - name: id
    *         in: path
    *         description: ID of the New
    *         required: true
    *         schema:
    *           type: string
    *     responses:
    *       '204':
    *         description: New deleted
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
    newController.createNews
)



router.get('/',
    newController.getAllNews
)


router.get(
    '/:id',
    validator.params({ id: idValidation }),
    newController.getNewById
)


router.put(
    '/:id',
    validator.params({ id: idValidation }),
    newController.updateNews
)


router.delete(
    '/:id',
    validator.params({ id: idValidation }),
    newController.deleteNews
)
export default router
