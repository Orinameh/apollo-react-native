import {
  FAVORITE_PRODUCT_FRAGMENT,
  GET_FAVORITE_PRODUCT_COUNT,
} from './requests';

export const resolvers = {
  Mutation: {
    addOrRemoveProductFromFavorite(_root, args, {client, cache}) {
      // Get productId from the cache
      const productId = cache.identify({
        __typename: 'Product',
        id: args.productId,
      });
      // read favorite from the client
      const {favorite} = client.readFragment({
        fragment: FAVORITE_PRODUCT_FRAGMENT,
        id: productId,
      });
      // update the favorite field in the data by writing to the fragment
      client.writeFragment({
        fragment: FAVORITE_PRODUCT_FRAGMENT,
        id: productId,
        data: {
          favorite: !favorite,
        },
      });

      // Read the favorite count on the from the client's query
      const {favoriteProductsCount} = client.readQuery({
        query: GET_FAVORITE_PRODUCT_COUNT,
      });
      // Update the favorite count on the product by writing on the query
      client.writeQuery({
        query: GET_FAVORITE_PRODUCT_COUNT,
        data: {
          favoriteProductsCount: favorite
            ? favoriteProductsCount - 1
            : favoriteProductsCount + 1,
        },
      });
    },
  },
};
