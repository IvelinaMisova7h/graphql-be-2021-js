import User from "../../models/User.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import validator from "validator";
import dotenv from "dotenv";
import { UserInputError } from "apollo-server";
dotenv.config();

export default {
    Query: {
        user: async (root, {_id}) => {
            const user = await User.findById(_id).populate("books");
            return user;
        },
        users: async () => {
            const users = await User.find({}).populate("books");
            return users;
        },
        currentUser: async (root, args, context) => {
            console.log('--->', context.user)
            return context.user;
        },
    },
    Mutation: {
        createUser: async(root, args) => {
            const userData = args.data;
            if(!validator.isEmail(userData.email)){
                throw new UserInputError(`Email is not valid: ${userData.email}`, {
                    field: "email",
                    value: userData.email,
                    constraint: "isEmail",
                })
            } 

            if(!validator.isLength(userData.password, {min: 6, max: 255})){
                throw new UserInputError(`Password has to be between 6 and 255 symbols`, {
                    field: "password",
                    value: userData.password,
                    constraint: "isLength",
                })
            } 

            userData.password = await bcryptjs.hash(userData.password, 10);   
            const newUser = new User(userData);
            await newUser.save();
            return newUser;
        },
        editUser: async(root, {_id, data}) => {
            const user = await User.findByIdAndUpdate(_id, 
                {$set: data}, 
                {
                    runValidators: true,
                    new: true,
                }).populate("games")
            return user;
        },
        deleteUser: async(root, {_id}) => {
            const user = User.findOneAndDelete(_id).populate("games");
            return user;
        },
        login: async(root, {email, password}) => {
            const matchedUser = await User.findOne({email});
            if(!matchedUser){
                throw new UserInputError(`cannot find user with email: ${email}`, {
                    field: "email",
                    value: email,
                    constraint: "emailDoesNotExist",
                })
            }

            const validPassword = await bcryptjs.compare(password, matchedUser.password);
            if(!validPassword){
                throw new UserInputError(`Password is incorrect`, {
                    field: "password",
                    value: "",
                    constraint: "passwordIncorrect",
                })
            }

            const privateKey = process.env.JSONWEBTOKEN_PRIVATE_KEY;
            const token = jwt.sign({
                _id: matchedUser._id,
                email: matchedUser.email, 
            }, privateKey, {
                expiresIn: "1d"
            });

            return token;
        },
        logout: async(root, email, context) => {
            
                //  if (!email) { 
                //   throw new ('Successfully logged out');
                // }
                console.log('Successfully logged out', context.user)

            return context.user;
        }
    }
}
//         logout: async(root, {email}, context) => {
//             //  err = auth.ExtractTokenAuth(c.Request.email)
//             // if (err != nil ){
//             //     c.JSON(http.StatusUnauthorized, "unauthorized")
                
//             // }
//             // delErr = model.Model.DeleteAuth(email)
//             // if (delErr != nil ){
//             //     log.Println(delErr)
//             //     c.JSON(http.StatusUnauthorized, "unauthorized")
                
//             // }
//             // c.JSON(http.StatusOK, "Successfully logged out")
//             // const matchedUser = await User.findOne({email});
//             // if(!matchedUser){
//             //     throw new UserInputError(`Successfully logged out: ${email}`, {
//             //         field: "email",
//             //         value: email,
//             //         constraint: "emailDoesNotExist",
//             //     })
//             // }





