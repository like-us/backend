import { TradeType } from '../../models'
import { NextFunction, Request, Response } from 'express'
import status from 'http-status'

export default {
        getAll: async function (_: Request, res: Response, next: NextFunction) {
                try {
                        const tradetypes = await TradeType.find({}).populate("trades")
                        res.status(status.OK).json(tradetypes)
                } catch (err) {
                        next(err)
                }
        },
        getOne: async function (req: Request, res: Response, next: NextFunction) {
                try {
                        const tradeType = await TradeType.findById(req.params.id).populate('trades')
                        res.status(status.OK).json(tradeType)
                } catch (err) {
                        next(err)
                }
        },
        create: async function (req: Request, res: Response, next: NextFunction) {
                try {
                        const { body } = req
                        const newTradeType = new TradeType({
                                ...body,
                        })

                        await newTradeType.save()
                        res.status(status.CREATED).json(newTradeType)
                } catch (err) {
                        next(err)
                }
        },
        update: async function (req: Request, res: Response, next: NextFunction) {
                try {
                        const { body } = req
                        const updatedTradeType = await TradeType.findByIdAndUpdate(
                                req.params.id,
                                { ...body }
                        )

                        res.status(status.OK).json(updatedTradeType)
                } catch (err) {
                        next(err)
                }
        },
        remove: async function (_: Request, res: Response) {
                res.status(201).end()
        },
}
