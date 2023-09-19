import { IJob } from '../models/Job'
import { ClientContact } from './ClientContact'

export interface NewJob extends Omit<IJob, 'clientContact'> {
	clientContact: ClientContact
}
