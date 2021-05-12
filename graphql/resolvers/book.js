import Book from "../../models/Book.js";

export default {
    Query: {
        book: async (root, {_id}) => {
            const book = await Book.findById(_id);
            return book;
        },
        books: async () => {
            const books = await Book.find({});
            return books;
        }
    },
    Mutation: {
        createBook: async(root, args) => {
            const newBook = new Book(args.data)
            await newBook.save();
            return newBook;
        },
        editBook: async(root, {_id, data}) => {
            const createBook = await Book.findByIdAndUpdate(_id, 
                {$set: data}, 
                {
                    runValidators: true,
                    new: true,
                })
            return book;
        },
        deleteBook: async(root, {_id}) => {
            const book = Book.findOneAndDelete(_id);
            return book;
        },
    }


}