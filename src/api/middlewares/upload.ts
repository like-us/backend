import cloudinary from 'cloudinary'
import { Request, Response, NextFunction } from 'express'

export default async function uploader(
  req: any,
  res: Response,
  next: NextFunction
) {
  if (!req.body || !req.body.images) {
    return next()
  }

  const images: string[] = []
  const uploadPromises: Promise<void>[] = []

  for (let i = 0; i < req.body.images.length; i++) {
    uploadPromises.push(
      new Promise((resolve, reject) => {
        cloudinary.v2.uploader.upload(
          req.body.images[i],
          (error: any, result: any) => {
            if (error) {
              reject(error)
            } else {
              images.push(result.secure_url)
              console.log(images)
              resolve()
            }
          }
        )
      })
    )
  }

  try {
    await Promise.all(uploadPromises)
    req.images = images
    next()
  } catch (error) {
    return res.status(500).json({ error: 'Image upload failed' })
  }
}
