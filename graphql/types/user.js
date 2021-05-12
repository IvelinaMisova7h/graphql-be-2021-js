export default `

    type User {
        _id: String!
        email: String!
        password: String!
        firstName: String!
        lastName: String!
        books: [Book]
        roles: [String]
        isConfirmed: Boolean!
        confirmOTP:  String!
        status:  Boolean!
    }

    input UserInput {
        email: String!
        password: String!
        books: [String]
        firstName: String!
        lastName: String!
        roles: [String]
        isConfirmed: Boolean!
	    confirmOTP:  String!
	    status:  Boolean!
    }

 

    type Query {
        user(_id: String!): User
        users: [User]
        currentUser: User
    }

    type Mutation {
        createUser(data: UserInput!): User
        editUser(_id: String!, data: UserInput!): User
        deleteUser(_id: String!): User
        login(email: String!, password: String!): String
        logout: User
    }

`