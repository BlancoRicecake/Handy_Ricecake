import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import ShopWebView from './src/screens/ShopWebView';

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <StatusBar barStyle="dark-content" />
      <ShopWebView />
    </SafeAreaView>
  );
}
