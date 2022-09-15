// const { ApolloServer, gql } = require("apollo-server");
import { ApolloServer, gql } from "apollo-server";

// The GraphQL schema
const typeDefs = gql`
  type Query {
    fetchBoards: String
  }
`;

// A map of functions which return data for the schema.
const resolvers = {
  Query: {
    fetchBoards: () => {
      return "첫 연습!!";
    },
  },

  //   Mutation:{
  //     createQqq: () =>{

  //     }
  //   }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen(3000, () => {
  console.log("서버프로그램을 켜는데 성공했어요!");
});
