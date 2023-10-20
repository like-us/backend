import nodemailer, { Transporter } from 'nodemailer'


class Mailer {
	private transporter: Transporter

	constructor() {
		this.transporter = nodemailer.createTransport({
			host: 'smtp-relay.brevo.com',
			port: 587,
			auth: {
				user: 'antoniealexandruiulian@gmail.com',
				pass: '01CZv79UItqLJmfh',
			},
		})
	}
	async sendContactEmail(email: string, message: string): Promise<void> {
		try {
			const mailOptions = {
				from: email,
				to: "lidvinelouange@gmail.com",
				// to: "mugishayves189000@gmail.com",
				subject: 'User contact from Like Us',
				text: message,
			}

			await this.transporter.sendMail(mailOptions)
		} catch (error) {
			console.error('Error sending email: ', error)
			throw error
		}
	}
}

export default new Mailer()
