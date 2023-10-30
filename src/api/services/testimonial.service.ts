import { Testimonial } from '../models'

const getTestimonialById = (id: string) => {
  return Testimonial.findOne({ _id: id })
}

const getAllTestimonial = async () => {
  return Testimonial.find({})
}
const createTestimonial = async (body: any) => {
  if(body.images[0]) console.log("There is image")
  const newUser = new Testimonial(body)
  return newUser.save()
}
const updateTestimonial = (id: string, body: any) => {
  return Testimonial.findByIdAndUpdate(id, { $set: { ...body } }, { new: true })
}

const deleteTestimonial = async (id: string) => {
  await Testimonial.findByIdAndDelete(id)
}

export default {
  getAllTestimonial,
  getTestimonialById,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
}
