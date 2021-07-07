/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {ProductsList} from './screens/ProductsList';
import {ProductDetils} from './screens/ProductDetails';
import {ApolloClient, ApolloProvider} from '@apollo/client';
import {GRAPQL_URL} from './config';

import {cache as cache_} from './graphql/cache';
import {resolvers} from './graphql/resolvers';
import {HeaderFavoriteProductCount} from './components/HeaderFavoriteProductCount';

const Stack = createStackNavigator();

const client_ = new ApolloClient({
  uri: GRAPQL_URL,
  cache: cache_,
  resolvers,
});

const App = () => {
  return (
    <ApolloProvider client={client_}>
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
