import cloudinary from 'cloudinary'
import { Request, Response, NextFunction } from 'express'

export default function Uploader(req: any, res: Response, next: NextFunction) {
  if (!req.body || !req.body.images) {
    return next()
  }
  let images: string[] = []
  for (let i = 0; i < req.body.images.length; i++) {
    cloudinary.v2.uploader.upload(
      req.body.images[i],
      (error: any, result: any) => {
        if (error) {
          return res.status(500).json({ error: 'Image upload failed' })
        }
        images.push(result.secure_url)
      }
    )
  }
  req.images = images
  next()
}
