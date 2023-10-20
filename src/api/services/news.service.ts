import { ANew } from '../models'


const getNewById = (id: string) => {
    return ANew.findOne({ _id: id })
}

const getAllNew = async () => {
    return ANew.find({})
}
const createNew = async (body: any) => {
    const newUser = new ANew(body);
    return newUser.save()
}
const updateNew = (id: string, body: any) => {
    return ANew.findByIdAndUpdate(id, { $set: { ...body } }, { new: true })
}

const deleteNew = async (id: string) => {
    await ANew.findByIdAndDelete(id)
}


export default {
    getAllNew,
    getNewById,
    createNew,
    updateNew,
    deleteNew
}
