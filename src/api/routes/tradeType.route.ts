import express from 'express'

const router = express.Router()

router.get('/')
router.get('/:id')
router.post('/')
router.put('/')
router.delete('/:id')

export default router
