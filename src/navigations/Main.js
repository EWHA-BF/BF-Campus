import React, { useContext } from "react";
import { ThemeContext } from "styled-components";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, View, Alert, Dimensions, Text } from "react-native";

import DrawerNav from "./DrawerNav";
import {
  Map,
  MyBoards,
  EmergencyBoard,
  Board,
  PostCreation,
  Post,

  EngBuilding,
  EccBuilding,
  EduBuilding,
  CulBuilding,
  LibBuilding,
  PoscoBuilding,
  SicBuilding,
  ArtBuilding,
  HelBuilding,
  LawBuilding,
  PhyBuilding,
  MusBuilding,
  SkBuilding,
  BusBuilding,
  LivBuilding,
} from "../screens";
import Navigation from ".";

const Stack = createStackNavigator();

//로그인 Yes 화면
const Main = () => {
  const theme = useContext(ThemeContext);
  return (
    <Stack.Navigator
      initialRouteName="Main"
      screenOptions={{
        cardStyle: { backgroundColor: theme.bgColor },
        headerShown: false,
      }}
    >
      <Stack.Screen name="Main" component={DrawerNav} />
      <Stack.Screen name="Map" component={Map} />
      <Stack.Screen name="EmergencyBoard" component={EmergencyBoard} />
      <Stack.Screen name="MyBoards" component={MyBoards} />
     
      <Stack.Screen
        name="Board"
        component={Board}
        options={{
          headerShown: true,
          headerTitleStyle: {
            fontSize: 18,
            fontWeight: "bold",
          },
          headerTintColor: theme.ewha_green,
          headerTitleAlign: "center",
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="PostCreation"
        component={PostCreation}
        options={{
          headerTitle: "글 쓰기",
          headerShown: true,
          headerTitleStyle: {
            fontSize: 18,
            fontWeight: "bold",
          },
          headerTintColor: theme.ewha_green,
          headerTitleAlign: "center",
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="Post"
        component={Post}
        options={{
          headerShown: true,
          headerTitleStyle: {
            fontSize: 18,
            fontWeight: "bold",
          },
          headerTintColor: theme.ewha_green,
          headerTitleAlign: "center",
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="EngBuilding"
        component={EngBuilding}
        options={{
          headerShown: true,
          headerBackTitleVisible: false,
          headerTitle: "공학관 정보",
          headerTitleStyle: {
            fontSize: 18,
            fontWeight: "bold",
          },
          headerTintColor: theme.ewha_green,
          headerTitleAlign: "center",
          headerLeft: ({ onPress }) => {
            return (
              <Ionicons
                name="chevron-back-outline"
                size={30}
                style={{ marginLeft: 5 }}
                onPress={onPress}
                color={theme.ewha_green}
              />
            );
          },
        }}
      />
      <Stack.Screen
        name="CulBuilding"
        component={CulBuilding}
        options={{
          headerShown: true,
          headerBackTitleVisible: false,
          headerTitle: "학생문화관 정보",
          headerTitleStyle: {
            fontSize: 18,
            fontWeight: "bold",
          },
          headerTintColor: theme.ewha_green,
          headerTitleAlign: "center",
          headerLeft: ({ onPress }) => {
            return (
              <Ionicons
                name="chevron-back-outline"
                size={30}
                style={{ marginLeft: 5 }}
                onPress={onPress}
                color={theme.ewha_green}
              />
            );
          },
        }}
      />
      <Stack.Screen
        name="EduBuilding"
        component={EduBuilding}
        options={{
          headerShown: true,
          headerBackTitleVisible: false,
          headerTitle: "교육관 정보",
          headerTitleStyle: {
            fontSize: 18,
            fontWeight: "bold",
          },
          headerTintColor: theme.ewha_green,
          headerTitleAlign: "center",
          headerLeft: ({ onPress }) => {
            return (
              <Ionicons
                name="chevron-back-outline"
                size={30}
                style={{ marginLeft: 5 }}
                onPress={onPress}
                color={theme.ewha_green}
              />
            );
          },
        }}
      />
      <Stack.Screen
        name="EccBuilding"
        component={EccBuilding}
        options={{
          headerShown: true,
          headerBackTitleVisible: false,
          headerTitle: "Ecc 정보",
          headerTitleStyle: {
            fontSize: 18,
            fontWeight: "bold",
          },
          headerTintColor: theme.ewha_green,
          headerTitleAlign: "center",
          headerLeft: ({ onPress }) => {
            return (
              <Ionicons
                name="chevron-back-outline"
                size={30}
                style={{ marginLeft: 5 }}
                onPress={onPress}
                color={theme.ewha_green}
              />
            );
          },
        }}
      />
      <Stack.Screen
        name="LibBuilding"
        component={LibBuilding}
        options={{
          headerShown: true,
          headerBackTitleVisible: false,
          headerTitle: "중앙도서관 정보",
          headerTitleStyle: {
            fontSize: 18,
            fontWeight: "bold",
          },
          headerTintColor: theme.ewha_green,
          headerTitleAlign: "center",
          headerLeft: ({ onPress }) => {
            return (
              <Ionicons
                name="chevron-back-outline"
                size={30}
                style={{ marginLeft: 5 }}
                onPress={onPress}
                color={theme.ewha_green}
              />
            );
          },
        }}
      />
      <Stack.Screen
        name="PoscoBuilding"
        component={PoscoBuilding}
        options={{
          headerShown: true,
          headerBackTitleVisible: false,
          headerTitle: "포스코관 정보",
          headerTitleStyle: {
            fontSize: 18,
            fontWeight: "bold",
          },
          headerTintColor: theme.ewha_green,
          headerTitleAlign: "center",
          headerLeft: ({ onPress }) => {
            return (
              <Ionicons
                name="chevron-back-outline"
                size={30}
                style={{ marginLeft: 5 }}
                onPress={onPress}
                color={theme.ewha_green}
              />
            );
          },
        }}
      />
      <Stack.Screen
        name="SicBuilding"
        component={SicBuilding}
        options={{
          headerShown: true,
          headerBackTitleVisible: false,
          headerTitle: "종합과학관 정보",
          headerTitleStyle: {
            fontSize: 18,
            fontWeight: "bold",
          },
          headerTintColor: theme.ewha_green,
          headerTitleAlign: "center",
          headerLeft: ({ onPress }) => {
            return (
              <Ionicons
                name="chevron-back-outline"
                size={30}
                style={{ marginLeft: 5 }}
                onPress={onPress}
                color={theme.ewha_green}
              />
            );
          },
        }}
      />
      {/*  */}
      <Stack.Screen
        name="ArtBuilding"
        component={ArtBuilding}
        options={{
          headerShown: true,
          headerBackTitleVisible: false,
          headerTitle: "조형예술관 정보",
          headerTitleStyle: {
            fontSize: 18,
            fontWeight: "bold",
          },
          headerTintColor: theme.ewha_green,
          headerTitleAlign: "center",
          headerLeft: ({ onPress }) => {
            return (
              <Ionicons
                name="chevron-back-outline"
                size={30}
                style={{ marginLeft: 5 }}
                onPress={onPress}
                color={theme.ewha_green}
              />
            );
          },
        }}
      />
      <Stack.Screen
        name="HelBuilding"
        component={HelBuilding}
        options={{
          headerShown: true,
          headerBackTitleVisible: false,
          headerTitle: "헬렌관 정보",
          headerTitleStyle: {
            fontSize: 18,
            fontWeight: "bold",
          },
          headerTintColor: theme.ewha_green,
          headerTitleAlign: "center",
          headerLeft: ({ onPress }) => {
            return (
              <Ionicons
                name="chevron-back-outline"
                size={30}
                style={{ marginLeft: 5 }}
                onPress={onPress}
                color={theme.ewha_green}
              />
            );
          },
        }}
      />
      <Stack.Screen
        name="LawBuilding"
        component={LawBuilding}
        options={{
          headerShown: true,
          headerBackTitleVisible: false,
          headerTitle: "법학관 정보",
          headerTitleStyle: {
            fontSize: 18,
            fontWeight: "bold",
          },
          headerTintColor: theme.ewha_green,
          headerTitleAlign: "center",
          headerLeft: ({ onPress }) => {
            return (
              <Ionicons
                name="chevron-back-outline"
                size={30}
                style={{ marginLeft: 5 }}
                onPress={onPress}
                color={theme.ewha_green}
              />
            );
          },
        }}
      />
      <Stack.Screen
        name="PhyBuilding"
        component={PhyBuilding}
        options={{
          headerShown: true,
          headerBackTitleVisible: false,
          headerTitle: "체육관 정보",
          headerTitleStyle: {
            fontSize: 18,
            fontWeight: "bold",
          },
          headerTintColor: theme.ewha_green,
          headerTitleAlign: "center",
          headerLeft: ({ onPress }) => {
            return (
              <Ionicons
                name="chevron-back-outline"
                size={30}
                style={{ marginLeft: 5 }}
                onPress={onPress}
                color={theme.ewha_green}
              />
            );
          },
        }}
      />
      <Stack.Screen
        name="MusBuilding"
        component={MusBuilding}
        options={{
          headerShown: true,
          headerBackTitleVisible: false,
          headerTitle: "음악관 정보",
          headerTitleStyle: {
            fontSize: 18,
            fontWeight: "bold",
          },
          headerTintColor: theme.ewha_green,
          headerTitleAlign: "center",
          headerLeft: ({ onPress }) => {
            return (
              <Ionicons
                name="chevron-back-outline"
                size={30}
                style={{ marginLeft: 5 }}
                onPress={onPress}
                color={theme.ewha_green}
              />
            );
          },
        }}
      />
      <Stack.Screen
        name="SkBuilding"
        component={SkBuilding}
        options={{
          headerShown: true,
          headerBackTitleVisible: false,
          headerTitle: "SK관 정보",
          headerTitleStyle: {
            fontSize: 18,
            fontWeight: "bold",
          },
          headerTintColor: theme.ewha_green,
          headerTitleAlign: "center",
          headerLeft: ({ onPress }) => {
            return (
              <Ionicons
                name="chevron-back-outline"
                size={30}
                style={{ marginLeft: 5 }}
                onPress={onPress}
                color={theme.ewha_green}
              />
            );
          },
        }}
      />
      <Stack.Screen
        name="BusBuilding"
        component={BusBuilding}
        options={{
          headerShown: true,
          headerBackTitleVisible: false,
          headerTitle: "신세계관 정보",
          headerTitleStyle: {
            fontSize: 18,
            fontWeight: "bold",
          },
          headerTintColor: theme.ewha_green,
          headerTitleAlign: "center",
          headerLeft: ({ onPress }) => {
            return (
              <Ionicons
                name="chevron-back-outline"
                size={30}
                style={{ marginLeft: 5 }}
                onPress={onPress}
                color={theme.ewha_green}
              />
            );
          },
        }}
      />
      <Stack.Screen
        name="LivBuilding"
        component={LivBuilding}
        options={{
          headerShown: true,
          headerBackTitleVisible: false,
          headerTitle: "생활환경관 정보",
          headerTitleStyle: {
            fontSize: 18,
            fontWeight: "bold",
          },
          headerTintColor: theme.ewha_green,
          headerTitleAlign: "center",
          headerLeft: ({ onPress }) => {
            return (
              <Ionicons
                name="chevron-back-outline"
                size={30}
                style={{ marginLeft: 5 }}
                onPress={onPress}
                color={theme.ewha_green}
              />
            );
          },
        }}
      />

    </Stack.Navigator>
  );
};

export default Main;