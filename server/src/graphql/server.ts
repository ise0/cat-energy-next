import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';
import getErrorOutput from '../utils/get-error-output';
import productQL from './product';

export const graphqlSchema = buildSchema(`
  ${productQL.typeDefs}

  type Query {
   ${productQL.queryTypes}
  }
`);

export const resolvers = { ...productQL.queryResolvers };

const graphqlServer = graphqlHTTP({
  schema: graphqlSchema,
  rootValue: resolvers,
  graphiql: true,
  customFormatErrorFn: (error) => getErrorOutput(error),
});

export default graphqlServer;
