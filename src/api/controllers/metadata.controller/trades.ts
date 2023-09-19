import { Trade, TradeType } from '../../models'
import { NextFunction, Request, Response } from 'express'
import status from 'http-status'

export default {
        getAll: async function (_: Request, res: Response, next: NextFunction) {
                try {
                        const trades = await Trade.find({})
                        res.status(status.OK).json(trades)
                } catch (err) {
                        next(err)
                }
        },
        getOne: async function (req: Request, res: Response, next: NextFunction) {
                try {
                        const trade = await Trade.findById(req.params.id)
                        res.status(status.OK).json(trade)
                } catch (err) {
                        next(err)
                }
        },
        create: async function (req: Request, res: Response, next: NextFunction) {
                try {
                        const name = req.body.name
                        const newTradeType = new Trade({
                                name,
                        })
                        const tradeType = await TradeType.findById(req.body.id)
                        tradeType?.trades.push(newTradeType.id)
                        await tradeType?.save()
                        await newTradeType.save()
                        res.status(status.CREATED).json(newTradeType)
                } catch (err) {
                        next(err)
                }
        },
        update: async function (req: Request, res: Response, next: NextFunction) {
                try {
                        const { body } = req
                        const updatedTradeType = await Trade.findByIdAndUpdate(
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
