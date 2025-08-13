// App.js (JavaScript)
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ShopWebView from './src/screens/ShopWebView';
import MeasureResultScreen from './src/screens/MeasureResultScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerTitle: '' }} initialRouteName="Shop">
        <Stack.Screen name="Shop" component={ShopWebView} options={{ title: 'Shop' }} />
        <Stack.Screen name="MeasureResult" component={MeasureResultScreen} options={{ title: 'Sizing' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
