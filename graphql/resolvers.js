// import path from "path";
import { mergeResolvers } from "@graphql-tools/merge";
// import { loadFilesSync } from "@graphql-tools/load-files"
import userResolver from "./resolvers/user.js";
import bookResolver from "./resolvers/book.js";
import movieResolver from "./resolvers/movie.js";

// const __dirname = path.resolve();
// const resolversArray = loadFilesSync(path.join(__dirname, './graphql/resolvers'), { extensions: ['js']});

export default mergeResolvers([userResolver, bookResolver, movieResolver]);