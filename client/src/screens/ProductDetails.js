import React from 'react';
import {FlatList, StyleSheet, Text} from 'react-native';
import {useQuery} from '@apollo/client';

import {GET_COMMENTS_BY_PRODUCT, GET_PRODUCT} from '../graphql/requests';
import {Loading} from '../components/Loading';
import {Error} from '../components/Error';
import {Product} from '../components/Product';
import {Card} from '../components/Card';
import {AddComment} from '../components/AddComment';

export function ProductDetils({route}) {
  const {productId} = route.params;
  const {loading, error, data} = useQuery(GET_PRODUCT, {
    variables: {
      productId,
    },
    fetchPolicy: 'cache-first',
  });

  const {
    loading: loading_,
    error: error_,
    data: data_,
  } = useQuery(GET_COMMENTS_BY_PRODUCT, {
    variables: {
      productId,
    },
    fetchPolicy: 'cache-and-network',
  });

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error error={error} />;
  }

  function numberOfComments() {
    return (
      <Text style={styles.title}>
        {data_?.comments?.length > 0
          ? `Comments[${data_.comments?.length}]`
          : 'No comments available'}
      </Text>
    );
  }

  function renderComment({item: comment}) {
    return (
      <Card id={comment.id} style={styles.commentCard}>
        <Text>{comment.comment}</Text>
      </Card>
    );
  }

  function renderHeader() {
    const {product} = data;
    return (
      <>
        <Product product={data.product} />
        <AddComment productId={product.id} />
        {loading_ && <Loading />}
        {error_ && <Error error={error_} />}
        {numberOfComments()}
      </>
    );
  }

  return (
    <FlatList
      data={data_?.comments ?? []}
      renderItem={renderComment}
      ListHeaderComponent={renderHeader}
      contentContainerStyle={styles.commentsContainer}
    />
  );
}

const styles = StyleSheet.create({
  commentsContainer: {
    padding: 8,
  },
  commentCard: {
    padding: 16,
    marginVertical: 8,
  },

  title: {
    marginBottom: 8,
    marginTop: 16,
  },
});
