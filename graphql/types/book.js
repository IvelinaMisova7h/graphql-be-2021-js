export default `

    type Book{
        _id: String!
        title: String!
        author: String!
        genre: String!
        read: Boolean!
        isbn: String!
	    user: String!
    }
  

    input CreateBookInput {
        title: String!
        author: String!
        genre: String!
        read: Boolean!
        isbn: String!
	    user: String!
    }

    type Query {
        book(_id: String!): Book
        books: [Book]
    }

    type Mutation {
        createBook(data: CreateBookInput!): Book
        editBook(_id: String!, data: CreateBookInput!): Book
        deleteBook(_id: String!): Book
    }

`