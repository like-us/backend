import { IUser } from '../models'

export type NewUser = Omit<
	IUser,
	'deleted' | 'suspended' | 'emailVerified' | 'phoneVerified' | 'profile'
>

export type LoginUser = Pick<IUser, 'email' | 'password'>

export type PublicUser = Omit<NewUser, 'password' | 'suspended'>
