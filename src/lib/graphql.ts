import { graphql } from 'graphql';
import { graphqlSchema, resolvers } from '@server/src/graphql/server';

export const graphqlExec = ({
  source,
  variableValues,
  req,
}: {
  source: string;
  variableValues: any;
  req: any;
}) =>
  graphql({
    schema: graphqlSchema,
    source,
    rootValue: resolvers,
    contextValue: req,
    variableValues,
  });
