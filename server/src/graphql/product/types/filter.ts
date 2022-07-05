export const filterTypeDefs = `
    
    type ProductFilterPickManyValue {
        name: String! 
        qty: Int!
    }
    
    type ProductFilterRangeValue { 
        min: Int!
        max: Int!
    }

 
    type ProductFilterPickMany {
        type: String!
        value: [ProductFilterPickManyValue!]!
    }
    
    type ProductFilterRange { 
        type: String!
        value: ProductFilterRangeValue!
    }

    type ProductFilterObj {
        range: ProductFilterRange
        pickMany: ProductFilterPickMany
    }
`;

export const filterQueryTypes = `
    productAvailableFilterValues(filterName: String!, filters: [ProductFilterInput!]!): ProductFilterObj
`;
