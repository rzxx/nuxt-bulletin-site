import uploadModel from "../models/image.model"
import itemModel from "../models/item.model"
import { decrypt, encrypt } from "../encryptor"

export default defineEventHandler(async (event) => {
  const id = getQuery(event).id as string
  const passphrase = getQuery(event).passphrase as string
  if (encrypt(passphrase, passphrase) === id){
    await uploadModel.deleteMany({sessionId: id})
    await itemModel.findOneAndDelete({id: id})

    return { statusCode: 200 };
  }
  else{
    return createError({ statusCode: 400, statusMessage: 'No permission' })
  }
})
