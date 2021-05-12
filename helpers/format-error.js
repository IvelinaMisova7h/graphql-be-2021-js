import { UserInputError } from "apollo-server";

export const formatError = (err) => {
    if (err.message.startsWith('Database Error: ')) {
      return new Error('Internal server error');
    }
    if(err.originalError instanceof UserInputError) {
        // Here we can format our user input errors;
        delete err.extensions.exception
    }
    return err;
}



// import { AuthenticationError } from "apollo-server";
// const resolvers = {
//   Mutation: {
//     protectedAction(root, args , { user }) { 
//       if (!user) { 
//         throw new AuthenticationError('You must be logged in');
//       }
//     }
//   }
// };