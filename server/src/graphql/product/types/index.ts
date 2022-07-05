import { filterQueryTypes, filterTypeDefs } from './filter';
import { productQueryTypes, productTypeDefs } from './product';

export const typeDefs = `

    input ProductFilterInput {
        name: String!
        value: String!
    }

    ${filterTypeDefs}
    ${productTypeDefs}
`;

export const queryTypes = `
    ${filterQueryTypes}
    ${productQueryTypes}
`;
