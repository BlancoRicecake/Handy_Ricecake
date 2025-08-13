import React from 'react';
import { Linking } from 'react-native';
import { WebView } from 'react-native-webview';

// handy-web 터미널에 나온 포트를 적으세요 (기본 5173)
const DEV_PORT = 5173;
const URL = __DEV__ ? `http://10.0.2.2:${DEV_PORT}` : 'https://handy.yourdomain.com';

export default function ShopWebView() {
  return (
    <WebView
      source={{ uri: URL }}
      javaScriptEnabled
      domStorageEnabled
      pullToRefreshEnabled
      cacheEnabled={false}
      setSupportMultipleWindows={false}
      onLoad={() => console.log('WebView loaded:', URL)}
      onError={(e) => console.log('WebView error:', e.nativeEvent)}
      onShouldStartLoadWithRequest={(req) => {
        const url = req.url || '';
        // 외부 전화/메일/결제는 브라우저로 열기
        if (/^(tel:|mailto:)/.test(url)) { Linking.openURL(url); return false; }
        if (/checkout|pay|auth|iamport|toss|inicis|kcp/.test(url)) { Linking.openURL(url); return false; }
        return true; // 내부 링크는 허용
      }}
    />
  );
}
