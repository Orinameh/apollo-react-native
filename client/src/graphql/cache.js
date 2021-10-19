import {InMemoryCache} from '@apollo/client';
import {GET_FAVORITE_PRODUCT_COUNT} from './requests';

function convertDollarValueToMAD(dollar) {
  return dollar * 10;
}

export const cache = new InMemoryCache({
  typePolicies: {
    // This is the type name
    Product: {
      fields: {
        // defined for local stored variable `favorite`
        favorite: {
          read(favorite = false) {
            return favorite;
          },
        },
        // Similar to above, attributes in the graphql can also be read and manipulated
        price(price) {
          return `${convertDollarValueToMAD(price)} MAD`;
        },
      },
    },
    Query: {
      fields: {
        // checks if there is already a product with same id in the catch, same product should be read from the cache
        product(_, {args, toReference}) {
          return toReference({
            __typename: 'Product',
            id: args.id,
          });
        },
      },
    },
  },
});

// set default value of favoriteProductsCount to 0
cache.writeQuery({
  query: GET_FAVORITE_PRODUCT_COUNT,
  data: {
    favoriteProductsCount: 0,
  },
});
