import uploadModel from "../models/image.model"
import itemModel from "../models/item.model"

export default defineEventHandler(async (event) => {
  const itemList = await itemModel.find()
  const items = itemList.map(async (part) => {
    const imageDoc = await uploadModel.findById(part.images[0])
    return {
      id: part.id,
      title: part.title,
      description: part.description,
      price: part.price,
      image: imageDoc?.get('path')
    }
  })
  const result = await Promise.all(items)
  return result
})
