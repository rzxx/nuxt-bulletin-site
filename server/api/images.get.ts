import uploadModel from "../models/image.model"
import { encrypt } from "../encryptor"

export default defineEventHandler(async (event) => {
  try {
    const receivedId = getQuery(event).sessionId as string

    const encryptedId = encrypt(receivedId, receivedId)
    //console.log("GET IMAGES:", encryptedId)
    const files = await uploadModel.find({sessionId: encryptedId})
    if (!files) {
      return createError({ statusCode: 400, statusMessage: 'Files are empty.' })
    }
    return files
  } catch (error) {
    return createError({ statusCode: 500, statusMessage: 'Something is wrong with the API.' })
  }
})
