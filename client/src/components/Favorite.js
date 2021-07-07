import React from 'react';
import {Pressable, StyleSheet} from 'react-native';
import {Path, Svg} from 'react-native-svg';

export function Favorite({favorite, onPress}) {
  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [styles.container, {opacity: pressed ? 0 : 1}]}>
      <Svg
        width={32}
        height={32}
        viewBox="0 0 24 24"
        fill={favorite ? 'white' : 'none'}
        stroke="white"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round">
        <Path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
      </Svg>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 64,
    width: 64,
    borderRadius: 40,
    backgroundColor: 'orange',
    position: 'absolute',
    right: 16,
    top: 260 - 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
