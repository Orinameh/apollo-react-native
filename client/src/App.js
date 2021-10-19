/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistCache, AsyncStorageWrapper} from 'apollo3-cache-persist';
import {ApolloClient, ApolloProvider} from '@apollo/client';

import {ProductsList} from './screens/ProductsList';
import {ProductDetils} from './screens/ProductDetails';
import {GRAPQL_URL} from './config';

import {cache as cache_} from './graphql/cache';
import {resolvers} from './graphql/resolvers';
import {HeaderFavoriteProductCount} from './components/HeaderFavoriteProductCount';
import {Loading} from './components/Loading';

const Stack = createStackNavigator();

const App = () => {
  const [client, setClient] = useState(null);

  useEffect(() => {
    persistCache({
      cache: cache_,
      storage: new AsyncStorageWrapper(AsyncStorage),
      trigger: 'background',
    }).then(() => {
      setClient(
        new ApolloClient({
          uri: GRAPQL_URL,
          cache: cache_,
          resolvers,
        }),
      );
    });
  }, []);

  if (!client) {
    return <Loading />;
  }
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerBackTitleVisible: false,
            headerTintColor: 'black',
          }}>
          <Stack.Screen
            name="ProductsList"
            component={ProductsList}
            options={{
              headerRight: () => <HeaderFavoriteProductCount />,
            }}
          />
          <Stack.Screen name="ProductDetails" component={ProductDetils} />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
};

export default App;
