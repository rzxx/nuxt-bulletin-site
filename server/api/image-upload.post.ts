import { AnyBulkWriteOperation } from "mongoose"
import uploadModel from "../models/image.model"

export default defineEventHandler(async (event) => {
  try{
    const files = await readMultipartFormData(event)
    if(!files){
      return createError({statusCode: 400, statusMessage: 'Files are empty.'})
    }
    const bulkOps: AnyBulkWriteOperation[] = []
    for (const file of files){
      await useStorage().setItemRaw(`fs:${file.filename}`, file.data)
      const data: AnyBulkWriteOperation = {
        insertOne:{
          document:{
            pageId: 1234,
            path: `/${file.filename}`
          }
        }
      }
      bulkOps.push(data)
    }
    await uploadModel.bulkWrite(bulkOps)
    return 200
  }
  catch (error){
    return createError({statusCode: 500, statusMessage: 'Something is wrong with api'})
  }
})
