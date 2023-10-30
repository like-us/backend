import { NextFunction, Request, Response } from 'express'
import { newService } from '../services'
import status from 'http-status'
import APIError from '../helpers/APIError'

const getNewById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const anew = await newService.getNewById(req.params.id)
    if (!anew) throw new APIError(status.NOT_FOUND, 'The New not found')
    res.json(anew)
  } catch (err) {
    next(err)
  }
}

const getAllNews = async (_req: Request, res: Response) => {
  const news = await newService.getAllNew()
  res.json(news)
}

const createNews = async (req: any, res: Response, next: NextFunction) => {
  try {
    const { body, images } = req
    console.log(body)
    console.log(images)
    const anew = await newService.createNew({...body, images})
    res.status(status.CREATED).json(anew)
  } catch (err) {
    next(err)
  }
}

const updateNews = async (req: any, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id
    const { body } = req
    const anew = await newService.updateNew(id, body)
    if (!anew) throw new APIError(status.NOT_FOUND, 'New does not exist')
    res.status(status.OK).json(anew)
  } catch (err) {
    next(err)
  }
}

const deleteNews = async (req: any, res: Response, next: NextFunction) => {
  try {
    await newService.deleteNew(req.params.id)
    res.status(status.NO_CONTENT).end()
  } catch (err) {
    next(err)
  }
}

export default {
  getAllNews,
  getNewById,
  createNews,
  updateNews,
  deleteNews,
}
