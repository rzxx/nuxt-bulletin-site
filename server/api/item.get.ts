import uploadModel from "../models/image.model"
import itemModel from "../models/item.model"

export default defineEventHandler(async (event) => {
  const id = getQuery(event).id as string
  const receivedItem = await itemModel.findOne({id: id})
  if (receivedItem){
    const receivedImages = await uploadModel.find({sessionId: id})
    const imagesPaths = receivedImages.map((image) => image.path);

    const result = {
      id: receivedItem?.id,
      title: receivedItem?.title,
      description: receivedItem?.description,
      price: receivedItem?.price,
      images: imagesPaths
    }
    return result
  }
  return createError({statusCode: 500, statusMessage: 'Something is wrong with api'})
})

