import mongoose from "mongoose";
const { Schema } = mongoose;

const BookSchema = new Schema ({
    title: {
        type: String
    },
    author: { 
        type: String
    },
    genre: {
        type: String
    },
    read: {
        type: Boolean, 
        default: false
    },
    isbn: {
        type: String,
         required: true
        },
	user: {
         type: Schema.ObjectId, 
         ref: "User", 
         required: true 
        },
})


const Book = mongoose.model("Book", BookSchema);
export default Book;