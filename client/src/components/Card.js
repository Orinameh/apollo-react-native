import React from 'react';
import {Pressable, StyleSheet} from 'react-native';

export function Card({style, children, onPress}) {
  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [{opacity: pressed ? 0.7 : 1}, styles.card]}>
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    marginVertical: 20,
    marginHorizontal: 8,
    backgroundColor: '#fff',
    borderRadius: 16,
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowColor: 'black',
    shadowOffset: {
      height: 0,
      width: 0,
    },
    elevation: 1,
  },
});
