import uploadModel from "../models/image.model";
import { encrypt } from "../encryptor"

export default defineEventHandler(async (event) => {
  try {
    const { id, imageId } = await readBody(event)
    const sessionId = encrypt(id, id)
    //console.log("DELETE:", id, sessionId)
    const objectForDeletion = await uploadModel.findById(imageId);
    if (objectForDeletion?.sessionId === sessionId){
      const deletedImage = await uploadModel.findByIdAndDelete(imageId);

      if (deletedImage) {
        await useStorage().removeItem(`fs:${deletedImage.path}`); 
        return { statusCode: 200 };
      } else {
        return createError({ 
          statusCode: 404, 
          statusMessage: "Image not found" 
        });
      }
    }
    else{
      return createError({ 
          statusCode: 400, 
          statusMessage: "No permission" 
        });
    }
  } catch (error) {
    return createError({ 
      statusCode: 500, 
      statusMessage: "Error deleting image" 
    });
  }
});