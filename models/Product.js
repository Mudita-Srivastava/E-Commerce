import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'please provide product name'],
        maxlength:[100, 'Name can not be more than 100 characters']
    },
    price: {
        type: Number,
        required: [true, 'please provide product price'],
        default:0,
    },
    description:{
        type: String,
        required:[true, 'Please provide product price'],
        maxlength:[1000, 'Description can not be more than 1000'],
    },
    
}
)