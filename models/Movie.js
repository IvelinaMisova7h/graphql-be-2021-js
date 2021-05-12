import mongoose from "mongoose";
const { Schema } = mongoose;

const MovieSchema = new Schema ({
    title: {
        type: String
    },
    description: {
        type: String
    },
    actors: {
        type: String
    },
    image: {
        type: String
    },
    rating: {
        type: Number,
        default: 0,
    },
    book: { 
        type: Schema.ObjectId, 
        ref: "Book", 
        required: true 
    },
})

const Movie = mongoose.model("Movie", MovieSchema);
export default Movie;