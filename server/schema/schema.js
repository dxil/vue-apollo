export const schema = `
  type Query {
    hello: String
  }
  
  schema {
    query: Query
  }
  `

export const resolvers = {
  Query: {
    hello(root, args, context) {
      return "Hello world"
    }
  }
}