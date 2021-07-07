import {gql} from '@apollo/client';

export const GET_ALL_PRODUCTS = gql`
  {
    products {
      id
      price
      description
      favorite @client
      name
      thumb {
        id
        url
      }
      comments {
        id
        comment
      }
    }
  }
`;

export const ADD_OR_REMOVE_PRODUCT_FROM_FAVORITE = gql`
  mutation AddOrRemoveProductFromFavorite($productId: ID!) {
    addOrRemoveProductFromFavorite(productId: $productId) @client
  }
`;

export const FAVORITE_PRODUCT_FRAGMENT = gql`
  fragment FavoriteProductFragment on Product {
    favorite
  }
`;

export const GET_FAVORITE_PRODUCT_COUNT = gql`
  {
    favoriteProductsCount @client
  }
`;
