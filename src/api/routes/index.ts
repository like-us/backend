import express, { Router } from 'express'
import payRouter from './pay.route'
import authRouter from './auth.route'
import newRouter from './news.router'
import testimonialRouter from './testimonial.route'

const router = express.Router()

const routes: {
	path: string
	route: Router
}[] = [
		{ path: '/pay', route: payRouter },
		{ path: '/auth', route: authRouter },
		{ path: '/news', route: newRouter },
		{ path: '/testimonials', route: testimonialRouter },
	]
routes.forEach((route) => {
	router.use(route.path, route.route)
})



export default router
