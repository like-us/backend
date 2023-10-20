import status from 'http-status'
import { NextFunction, Request, Response } from 'express';
import { contactService } from '../services';

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