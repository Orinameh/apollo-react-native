import {useMutation} from '@apollo/client';
import React from 'react';
import {Image, Text, View, StyleSheet} from 'react-native';
import {BASE_URL} from '../config';
import {ADD_OR_REMOVE_PRODUCT_FROM_FAVORITE} from '../graphql/requests';
import {Card} from './Card';
import {Favorite} from './Favorite';

export function Product({
  product: {id, thumb, name, price, description, favorite},
  onPress,
}) {
  const [addOrRemoveProductFromFavorite] = useMutation(
    ADD_OR_REMOVE_PRODUCT_FROM_FAVORITE,
    {
      variables: {
        productId: id,
      },
    },
  );
  return (
    <Card key={id} style={styles.card} onPress={onPress}>
      <Image style={styles.thumb} source={{uri: `${BASE_URL}${thumb.url}`}} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.price}>{price}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
      <Favorite
        favorite={favorite}
        onPress={async () => {
          await addOrRemoveProductFromFavorite();
        }}
      />
    </Card>
  );
}

const styles = StyleSheet.create({
  thumb: {
    height: 260,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  infoContainer: {
    padding: 16,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
  },
  description: {
    fontSize: 16,
    fontWeight: '400',
    color: '#787878',
  },
});
