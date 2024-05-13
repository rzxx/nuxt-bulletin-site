import {Schema, model} from 'mongoose'

const schema = new Schema({
    pageId:{
        type: Number,
        required: [true, 'pageId is required']
    },
    path: {
        type: String,
        required: [true, 'Path is required']
    }
})

const uploadModel = model('images', schema);

export default uploadModel;