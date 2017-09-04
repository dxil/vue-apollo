import { makeExecutableSchema } from 'graphql-tools';

import resolvers from './resolver';

const schema = `
type Author {
  id: Int! # the ! means that every author object _must_ have an id
  firstName: String
  lastName: String
  posts: [Post] # the list of Posts by this author
}
type Post {
  id: Int!
  title: String
  author: Author
  votes: Int
}
type Meeting {
  _id: String
  name: String
  status: String
  application: [Application]
}
type Application {
  _id: String!
  meetingId: String
  corporationId: String
  name: String
  company: Company
}
type Company {
  _id: String!
  name: String
  shareCode: String
  shareType: String
}
# the schema allows the following query:
type Query {
  posts: [Post]
  author(id: Int!): Author
  meeting(name: String!): Meeting
  company(name: String!): Company
  application(id: String!): Application
}
# this schema allows the following mutation:
type Mutation {
  upvotePost (
    postId: Int!
  ): Post
}
type Subscription {
  postUpvoted: Post
}
`;

export default makeExecutableSchema({
  typeDefs: schema,
  resolvers,
});