import mailer from "api/helpers/mailer"

const createTestimonial = async (body: any) => {
	mailer.sendPasswordEmail()
}

export default {
	createTestimonial,
}
