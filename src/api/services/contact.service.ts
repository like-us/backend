import { Contact } from "../models"
import mailer from "api/helpers/mailer"

const createContact = async (body: any) => {
	const contact = new Contact(body);
	await mailer.sendContactEmail(body.email,body.message);
	return await contact.save();
}

export default {
	createContact,
}
