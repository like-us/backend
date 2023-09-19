// Define the AdminRole enum
import { IAdmin } from '../models/Admin'

export const AdminRoleEnum = ['SUPER_ADMIN', 'ADMIN', 'STAFF'] as const
export type AdminRole = (typeof AdminRoleEnum)[number]
export type NewAdmin = Omit<
	IAdmin,
	'suspended' | 'emailVerified' | 'phoneVerified'
>
export type PublicAdmin = Omit<IAdmin, 'password'>
export type Admin = IAdmin
