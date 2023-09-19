import express, { Router } from 'express'
import userRouter from './user.route'
import authRouter from './auth.route'
import metadataRouter from './metadata.route'
import adminRouter from './admin.route'
import notificationRouter from './notification.route'
import dashboardRouter from './dashboard.route'
import contactRouter from './contact.route'
import profileRouter from './profile.route'

const router = express.Router()

const routes: {
	path: string
	route: Router
}[] = [
		{ path: '/admin', route: adminRouter },
		{ path: '/user', route: userRouter },
		{ path: '/auth', route: authRouter },
		{ path: '/metadata', route: metadataRouter },
		{ path: '/notification', route: notificationRouter },
		{ path: '/dashboard', route: dashboardRouter },
		{ path: '/contact', route: contactRouter },
		{ path: '/profile', route: profileRouter },
	]
routes.forEach((route) => {
	router.use(route.path, route.route)
})



export default router
