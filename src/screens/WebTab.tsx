// src/screens/WebTab.tsx
import React, { useRef, useState, useCallback } from "react";
import { BackHandler, Platform, View } from "react-native";
import { WebView } from "react-native-webview";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useFocusEffect } from "@react-navigation/native";

type RootParam = { path?: string; title?: string };
type Props = NativeStackScreenProps<any>;

const BASE_WEB =
  Platform.OS === "android" ? "http://10.0.2.2:5173" : "http://localhost:5173";

export default function WebTab({ route, navigation }: Props) {
  const { path = "/", title } = (route.params ?? {}) as RootParam;
  const withAppFlag = (p: string) => (p.includes("?") ? `${p}&app=1` : `${p}?app=1`);
  const uri = `${BASE_WEB}${withAppFlag(path)}`;
  const ref = useRef<WebView>(null);
  const [canGoBack, setCanGoBack] = useState(false);

  // 탭 헤더 제목(원하면 숨길 수도 있음)
  React.useEffect(() => {
    navigation.setOptions({ title: title ?? "" });
  }, [navigation, title]);

  // 안드로이드 뒤로가기 → 웹 내 뒤로가기
  useFocusEffect(
  useCallback(() => {
    const onBack = () => {
      if (canGoBack) {
        ref.current?.goBack();
        return true; // 이벤트 소비
      }
      return false;  // 디폴트 동작(앱 종료/상위 화면)으로 넘김
    };
    const sub = BackHandler.addEventListener("hardwareBackPress", onBack);
    return () => sub.remove();
  }, [canGoBack])
);


  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <WebView
        ref={ref}
        source={{ uri }}
        onNavigationStateChange={(e) => setCanGoBack(e.canGoBack)}
        // 새창/외부 링크는 시스템 브라우저로 열기
        onShouldStartLoadWithRequest={(req) => {
          const isSameHost =
            req.url.startsWith(BASE_WEB) || req.url.startsWith("about:blank");
          return isSameHost;
        }}
        setSupportMultipleWindows={false}
        javaScriptEnabled
        domStorageEnabled
        // Android에서 아래가 있어야 http(dev) 접속 허용
        mixedContentMode="always"
        // 아래 옵션은 보기 좋아서 추가(선택)
        allowsBackForwardNavigationGestures
      />
    </View>
  );
}
