import uploadModel from "../models/image.model"

export default defineEventHandler(async (event) => {
  try{
    const {filePath} = await readBody(event)
    await uploadModel.findOneAndDelete(filePath)
    await useStorage().removeItem(`fs:${filePath}`)
    return 200
  } catch (error){
    return createError({statusCode: 500, statusMessage: 'Something is wrong with api'})
  }
})
