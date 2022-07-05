export const productTypeDefs = `
    type Product {
        _id: ID!
        name: String!
        price: Float!
        flavor: String!
        weight: String!
        brand: String!
        img: String!
    }

    type Products {
        items: [Product!]!
        totalQty: Int!
    }

    input ProductPaginationInput {
        first: Int!
        skip: Int!
    }

    enum ProductSortEnum {
        PRICE_DOWN
        PRICE_UP
    }
`;

export const productQueryTypes = `
    product(id: ID!): Product
  
    products(pagination: ProductPaginationInput!, filters: [ProductFilterInput!]!, sort: ProductSortEnum): Products!
`;
