// App.tsx
import React from "react";
import { Text } from "react-native";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import WebTab from "./src/screens/WebTab"; // 앞서 만든 파일
import AppTopBar from "./src/screens/AppTopBar";

const Tab = createBottomTabNavigator();

const TabIcon = ({ label, focused }: { label: string; focused: boolean }) => (
  <Text style={{ fontSize: 12, color: focused ? "#000" : "#777" }}>{label}</Text>
);

export default function App() {
  return (
    <NavigationContainer theme={{ ...DefaultTheme }}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,       // 웹 상단바 그대로 쓰려면 true로 바꾸지 마세요
          tabBarShowLabel: false,   // 레이블 숨기고 이모지 "아이콘"만 사용
          tabBarStyle: { height: 56, paddingBottom: 6, paddingTop: 6 },
        }}
      >
       <Tab.Screen
  name="Home"
  component={WebTab}
  initialParams={{ path: "/", title: "HOME" }}
  options={({ navigation, route }) => ({
    headerShown: true,
    header: () => (
      <AppTopBar
        onSelectPath={(p) => {
          navigation.setParams({ ...(route.params ?? {}), path: p });
        }}
      />
    ),
    tabBarIcon: ({ focused }) => <TabIcon label="🏠" focused={focused} />,
  })}
/>

        <Tab.Screen
          name="Snap"
          component={WebTab}
          initialParams={{ path: "/snap", title: "SNAP" }}
          options={{ tabBarIcon: ({ focused }) => <TabIcon label="📸" focused={focused} /> }}
        />
        <Tab.Screen
          name="News"
          component={WebTab}
          initialParams={{ path: "/news", title: "NEWS" }}
          options={{ tabBarIcon: ({ focused }) => <TabIcon label="📰" focused={focused} /> }}
        />
        <Tab.Screen
          name="My"
          component={WebTab}
          initialParams={{ path: "/my", title: "MY" }}
          options={{ tabBarIcon: ({ focused }) => <TabIcon label="👤" focused={focused} /> }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
