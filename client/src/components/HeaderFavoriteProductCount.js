import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useQuery} from '@apollo/client';
import {GET_FAVORITE_PRODUCT_COUNT} from '../graphql/requests';

const SIZE = 32;

export const HeaderFavoriteProductCount = () => {
  const {data} = useQuery(GET_FAVORITE_PRODUCT_COUNT);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{data?.favoriteProductsCount}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 8,
    backgroundColor: 'orange',
    height: SIZE,
    width: SIZE,
    borderRadius: SIZE / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
  },
});
