import {Schema, model} from 'mongoose'

const schema = new Schema({
    sessionId:{
        type: String,
        required: [true, 'sessionId is required']
    },
    path: {
        type: String,
        required: [true, 'Path is required']
    }
}, {timestamps: true})

const uploadModel = model('images', schema);

export default uploadModel;