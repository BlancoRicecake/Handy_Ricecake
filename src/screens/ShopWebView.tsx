import React from 'react';
import { Alert, Linking } from 'react-native';
import { WebView } from 'react-native-webview';

const DEV_PORT = 5173; // handy-web 실제 포트와 일치시켜 주세요
const URL = __DEV__ ? `http://10.0.2.2:${DEV_PORT}` : 'https://handy.yourdomain.com';

export default function ShopWebView() {
  return (
    <WebView
      source={{ uri: URL }}
      javaScriptEnabled
      domStorageEnabled
      cacheEnabled={false}
      pullToRefreshEnabled
      mixedContentMode="always"
      setSupportMultipleWindows={false}
      onMessage={(e) => {
        try {
          const msg = JSON.parse(e.nativeEvent.data);
          if (msg.type === 'open-sizing') {
            Alert.alert('Native sizing', `productId=${msg.productId}`);
            // TODO: 네이티브 사이징 화면으로 navigate
          } else if (msg.type === 'checkout') {
            Alert.alert('Checkout', msg.total ? `total=${msg.total}` : 'open checkout');
            // TODO: 네이티브 결제 화면 열기
          }
        } catch (err) {
          console.log('onMessage parse error', err);
        }
      }}
      onShouldStartLoadWithRequest={(req) => {
        const url = req.url || '';
        if (/^(tel:|mailto:)/.test(url)) { Linking.openURL(url); return false; }
        if (/checkout|pay|auth|iamport|toss|inicis|kcp/.test(url)) { Linking.openURL(url); return false; }
        return true;
      }}
      onError={(e)=>console.log('WV error', e.nativeEvent)}
    />
  );
}
