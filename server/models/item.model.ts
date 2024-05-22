import {Schema, model} from 'mongoose'

const schema = new Schema({
    id:{
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: String,
    price: {
        type: Number,
        required: true
    },
    images: [
        {
        type: Schema.Types.ObjectId,
        required: true
        },
    ]
}, {timestamps: true})

const itemModel = model('items', schema);

export default itemModel;