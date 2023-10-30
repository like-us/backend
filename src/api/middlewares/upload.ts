import { NextFunction, Request, Response } from "express"

export default function Uploader(
	req: Request,
	res:Response,
	next: NextFunction 
) {
	const authHeader = req.headers['authorization']
	
	next()
}