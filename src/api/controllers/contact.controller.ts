const createContact = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { body } = req;
        const contact = await contactService.createContact(body)
        res.status(status.CREATED).json(contact)
    } catch (err) {
        next(err)
    }
}


export default {
    createContact
}