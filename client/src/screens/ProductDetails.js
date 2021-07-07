import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export function ProductDetils() {
  return (
    <View style={styles.container}>
      <Text>This is the product details screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
