import {gql} from '@apollo/client';

export const PRODUCT_FRAGMENT = gql`
  fragment ProductFragment on Product {
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
`;

export const GET_ALL_PRODUCTS = gql`
  {
    products {
      ...ProductFragment
    }
  }
  ${PRODUCT_FRAGMENT}
`;

export const ADD_OR_REMOVE_PRODUCT_FROM_FAVORITE = gql`
  mutation AddOrRemoveProductFromFavorite($productId: ID!) {
    # @client means this mutation function is local and not sent to the remote graphql
    addOrRemoveProductFromFavorite(productId: $productId) @client
  }
`;

export const FAVORITE_PRODUCT_FRAGMENT = gql`
  # FavoriteProductFragment is a subtype of Product
  fragment FavoriteProductFragment on Product {
    # favorite is the value to be read
    favorite
  }
`;

export const GET_FAVORITE_PRODUCT_COUNT = gql`
  {
    favoriteProductsCount @client
  }
`;

export const GET_PRODUCT = gql`
  query GetProduct($productId: ID!) {
    product(id: $productId) {
      ...ProductFragment
    }
  }
  ${PRODUCT_FRAGMENT}
`;

export const GET_COMMENTS_BY_PRODUCT = gql`
  query GetCommentsByProduct($productId: ID!) {
    comments(sort: "id:desc", where: {product: {id: $productId}}) {
      id
      comment
    }
  }
`;

export const CREATE_COMMENT = gql`
  mutation CreateComment($comment: String!, $productId: ID!) {
    createComment(input: {data: {comment: $comment, product: $productId}}) {
      comment {
        id
        comment
      }
    }
  }
`;
