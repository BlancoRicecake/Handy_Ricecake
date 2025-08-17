// src/components/AppTopBar.tsx
import React from "react";
import { View, Text, Pressable, TextInput, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type TabItem = { key: string; label: string; path: string };

export default function AppTopBar({
  onSelectPath,
}: {
  onSelectPath: (path: string) => void;
}) {
  // 원하는 탭/경로 매핑 (원하면 자유롭게 수정)
  const tabs: TabItem[] = [
    { key: "recommend", label: "추천", path: "/" },
    { key: "ranking", label: "랭킹", path: "/snap/ranking" },
    { key: "sale", label: "세일", path: "/news?tag=%EC%84%B8%EC%9D%BC" },
    { key: "brands", label: "브랜드", path: "/brands" },
    { key: "release", label: "발매", path: "/news" },
  ];

  const [active, setActive] = React.useState(tabs[0].key);
  const [q, setQ] = React.useState("");

  const go = (t: TabItem) => {
    setActive(t.key);
    onSelectPath(t.path);
  };

  return (
    <SafeAreaView edges={["top"]} style={S.wrap}>
      {/* 1) 상단 로고행 */}
      <View style={S.rowTop}>
        <Text style={S.logo}>HANDY</Text>

        <View style={S.actions}>
          {/* 알림/장바구니는 우선 이모지로 – 나중에 벡터아이콘으로 교체 가능 */}
          <Pressable onPress={() => onSelectPath("/my")}>
            <Text style={S.iconTxt}>🔔</Text>
          </Pressable>
          <Pressable onPress={() => onSelectPath("/cart")}>
            <Text style={S.iconTxt}>👜</Text>
          </Pressable>
        </View>
      </View>

      {/* 2) 서치바 */}
      <View style={S.searchBar}>
        <TextInput
          value={q}
          onChangeText={setQ}
          placeholder="브랜드위크 최대 80% 할인"
          placeholderTextColor="#9AA0A6"
          style={S.searchInput}
          returnKeyType="search"
          onSubmitEditing={() => {
            if (q.trim()) onSelectPath(`/search?q=${encodeURIComponent(q.trim())}`);
          }}
        />
        <Pressable
          onPress={() => onSelectPath(`/search?q=${encodeURIComponent(q.trim())}`)}
          style={S.searchBtn}
          hitSlop={10}
        >
          <Text style={{ fontSize: 18 }}>🔍</Text>
        </Pressable>
      </View>

      {/* 3) 탭 라인 (가로 스크롤) */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={S.tabs}
      >
        {/* “콘텐츠” 같은 고정 앞머리가 필요하면 여기 추가 */}
        {/* <Text style={[S.tabText, {color:'#9AA0A6'}]}>콘텐츠</Text> */}
        {tabs.map((t) => {
          const isActive = active === t.key;
          return (
            <Pressable key={t.key} onPress={() => go(t)} style={S.tabBtn}>
              <Text style={[S.tabText, isActive && S.tabActive]}>{t.label}</Text>
              {isActive ? <View style={S.indicator} /> : null}
            </Pressable>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const S = StyleSheet.create({
  wrap: { backgroundColor: "#111" },
  rowTop: {
    paddingHorizontal: 16,
    paddingTop: 6,
    paddingBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logo: { color: "white", fontSize: 28, fontWeight: "700", letterSpacing: 1 },
  actions: { flexDirection: "row", gap: 16, alignItems: "center" },
  iconTxt: { fontSize: 20 },
  searchBar: {
    marginHorizontal: 16,
    backgroundColor: "white",
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 14,
    paddingRight: 8,
    height: 42,
  },
  searchInput: { flex: 1, color: "#111", fontSize: 15, paddingVertical: 0 },
  searchBtn: { paddingHorizontal: 6, paddingVertical: 4 },
  tabs: {
    paddingHorizontal: 14,
    paddingTop: 10,
    paddingBottom: 6,
    gap: 22,
    alignItems: "flex-end",
  },
  tabBtn: { alignItems: "center" },
  tabText: { color: "#bfbfbf", fontSize: 18, fontWeight: "600" },
  tabActive: { color: "white" },
  indicator: { marginTop: 6, height: 2, width: 18, backgroundColor: "white", borderRadius: 1 },
});
