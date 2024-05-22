import itemModel from "../models/item.model"
import imageModel from "../models/image.model"
import { encrypt } from "../encryptor"

export default defineEventHandler(async (event) => {
  try{
    const formDataBody = await readMultipartFormData(event)
    const formData = new FormData()
    // Append the data to a new FormData (need to convert Buffer into string / Blob)
    formDataBody?.forEach((value) => {
      if (value.name && value.data) {
        formData.append(value.name, value.data.toString())
      }
    })
    const sessionId = formData.get("sessionId") as string
    const title = formData.get("title")
    const description = formData.get("description")
    const price = Number(formData.get("price"))
    const idEncrypted = encrypt(sessionId, sessionId)
    const images = await imageModel.find({ sessionId: idEncrypted });

    // Extract the _ids from the image documents
    const imageIds = images.map(image => image._id);
    await itemModel.create({
      id: idEncrypted,
      title: title,
      description : description,
      price: price,
      images: imageIds
    })

  }
  catch(e){
    console.error(e)
  }

  return { statusCode: 200 };
})
