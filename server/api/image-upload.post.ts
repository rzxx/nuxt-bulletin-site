import { AnyBulkWriteOperation } from "mongoose"
import uploadModel from "../models/image.model"
import { encrypt } from "../encryptor"

export default defineEventHandler(async (event) => {
  try{
    const formData = await readMultipartFormData(event)
    if(!formData){
      return createError({statusCode: 400, statusMessage: 'FormData is empty.'})
    }
    const bulkOps: AnyBulkWriteOperation[] = []
    let sessionId = null
    //getting sessionId
    for (const item of formData) {
      if (!sessionId){
        if (item.name === 'sessionId') {
          sessionId = encrypt(item.data.toString(), item.data.toString())
          //console.log("UPLOAD: ", sessionId, item.data.toString())
          break
        }
      }
      else{
        return createError({statusCode: 400, statusMessage: 'Multiple sessionId'})
      }
    }
    if (sessionId==='') return createError({statusCode: 400, statusMessage: 'No sessionId found'})
    
    //checking for already uploaded files with this sessionId
    const existingFilesAmount = (await uploadModel.find({ sessionId })).length;
    for (const [index, file] of formData.entries()){
      if (file.name == "file"){
        const filetype = file.type?.split("/") || ""
        const filename = `${sessionId}-${existingFilesAmount+index}.${filetype[1]}`
        await useStorage().setItemRaw(`fs:${filename}`, file.data)
        const data: AnyBulkWriteOperation = {
          insertOne:{
            document:{
              sessionId: sessionId,
              path: `/${filename}`
            }
          }
        }
        bulkOps.push(data)
      }
    }
    await uploadModel.bulkWrite(bulkOps)
    return 200
  }
  catch (error){
    return createError({statusCode: 500, statusMessage: 'Something is wrong with api'})
  }
})
