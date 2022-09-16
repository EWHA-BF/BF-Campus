import styled from "styled-components";
import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Dimensions } from "react-native";
import * as Location from "expo-location";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// 건물별 편한 출입구 위치
let gateData = [
  //공학관
  { coordinates: { latitude: 37.566693, longitude: 126.948784 } },
  { coordinates: { latitude: 37.566944, longitude: 126.948496 } },
  //중앙도서관
  { coordinates: { latitude: 37.561676, longitude: 126.949057 } },
  //헬렌관
  { coordinates: { latitude: 37.562007, longitude: 126.948639 } },
  //음악관
  { coordinates: { latitude: 37.560857, longitude: 126.949116 } },
  { coordinates: { latitude: 37.560946, longitude: 126.949663 } },
  //법학관
  { coordinates: { latitude: 37.562954, longitude: 126.949108 } },
  { coordinates: { latitude: 37.562729, longitude: 126.949132 } },
  { coordinates: { latitude: 37.563116, longitude: 126.949111 } },
  //포스코관
  { coordinates: { latitude: 37.563486, longitude: 126.946836 } },
  { coordinates: { latitude: 37.563422, longitude: 126.947066 } },
  { coordinates: { latitude: 37.563232, longitude: 126.946469 } },
  { coordinates: { latitude: 37.563226, longitude: 126.946942 } },
  //학생문화관
  { coordinates: { latitude: 37.562664, longitude: 126.945813 } },
  { coordinates: { latitude: 37.562415, longitude: 126.945763 } },
  //생활환경관
  { coordinates: { latitude: 37.562151, longitude: 126.944321 } },
  { coordinates: { latitude: 37.562321, longitude: 126.944835 } },
  { coordinates: { latitude: 37.561636, longitude: 126.94438 } },
  //sk관
  { coordinates: { latitude: 37.56196, longitude: 126.943597 } },
  //삼성 교육 문화관
  { coordinates: { latitude: 37.561966, longitude: 126.942961 } },
  { coordinates: { latitude: 37.562064, longitude: 126.943494 } },
  //신세계관
  { coordinates: { latitude: 37.561499, longitude: 126.942563 } },
  //국제교육관
  { coordinates: { latitude: 37.560135, longitude: 126.944162 } },
  //체육관
  { coordinates: { latitude: 37.561336, longitude: 126.947337 } },
  { coordinates: { latitude: 37.561219, longitude: 126.947531 } },
  { coordinates: { latitude: 37.56095, longitude: 126.946892 } },
  //ECC
  { coordinates: { latitude: 37.561093, longitude: 126.945992 } },
  { coordinates: { latitude: 37.560637, longitude: 126.946677 } },
  //조형예술관
  { coordinates: { latitude: 37.560657, longitude: 126.947559 } },
  { coordinates: { latitude: 37.560799, longitude: 126.948374 } },
  { coordinates: { latitude: 37.561179, longitude: 126.947998 } },
  //교육관
  { coordinates: { latitude: 37.564895, longitude: 126.946442 } },
  { coordinates: { latitude: 37.564722, longitude: 126.946059 } },
  //종합과학관
  { coordinates: { latitude: 37.564292, longitude: 126.947698 } },
  { coordinates: { latitude: 37.564065, longitude: 126.947195 } },
  { coordinates: { latitude: 37.564574, longitude: 126.948206 } },
  { coordinates: { latitude: 37.564468, longitude: 126.948355 } },
];

//건물별 불편한 출입구
let hardGateData = [
  //공학관
  { coordinates: { latitude: 37.566362, longitude: 126.948557 } },
  { coordinates: { latitude: 37.566561, longitude: 126.948155 } },
  //중앙도서관
  { coordinates: { latitude: 37.56186, longitude: 126.949581 } },
  { coordinates: { latitude: 37.562091, longitude: 126.948829 } },
  //헬렌관
  { coordinates: { latitude: 37.5622, longitude: 126.948164 } },
  //음악관
  { coordinates: { latitude: 37.560755, longitude: 126.94943 } },
  //법학관
  { coordinates: { latitude: 37.563094, longitude: 126.949505 } },
  //진선미관
  { coordinates: { latitude: 37.563369, longitude: 126.947577 } },
  { coordinates: { latitude: 37.563481, longitude: 126.947754 } },
  //약학관
  { coordinates: { latitude: 37.563019, longitude: 126.94685 } },
  { coordinates: { latitude: 37.56249, longitude: 126.94642 } },
  { coordinates: { latitude: 37.562748, longitude: 126.946409 } },
  { coordinates: { latitude: 37.562482, longitude: 126.945319 } },
  //생활환경관
  { coordinates: { latitude: 37.562278, longitude: 126.944642 } },
  //sk관
  { coordinates: { latitude: 37.561619, longitude: 126.943251 } },
  { coordinates: { latitude: 37.561731, longitude: 126.943304 } },
  //삼성 교육 문화관
  { coordinates: { latitude: 37.562265, longitude: 126.943198 } },
  //신세계관
  { coordinates: { latitude: 37.561776, longitude: 126.942407 } },
  { coordinates: { latitude: 37.561608, longitude: 126.942189 } },
  //국제교육관
  { coordinates: { latitude: 37.560311, longitude: 126.944174 } },
  //체육관
  { coordinates: { latitude: 37.560839, longitude: 126.947107 } },
  //조형예술관
  { coordinates: { latitude: 37.56064, longitude: 126.947326 } },
  { coordinates: { latitude: 37.560853, longitude: 126.9477823 } },
  //교육관
  { coordinates: { latitude: 37.565105, longitude: 126.946356 } },
];


// 건물 마커 위치
let Building = [
  {
    coordinates: { latitude: 37.566463, longitude: 126.948375 },
    navigations: "EngBuilding",
  },
  {
    coordinates: { latitude: 37.564098, longitude: 126.947481 },
    navigations: "SicBuilding",
  },
  {
    coordinates: { latitude: 37.561956, longitude: 126.949204 },
    navigations: "LibBuilding",
  },
  {
    coordinates: { latitude: 37.564945, longitude: 126.946378 },
    navigations: "EduBuilding",
  },
  {
    coordinates: { latitude: 37.563501, longitude: 126.94685 },
    navigations: "PoscoBuilding",
  },
  {
    coordinates: { latitude: 37.562617, longitude: 126.94556 },
    navigations: "CulBuilding",
  },
  {
    coordinates: { latitude: 37.561025, longitude: 126.94654 },
    navigations: "EccBuilding",
  },
  {
    coordinates: { latitude: 37.561029, longitude: 126.94804 },
    navigations: "ArtBuilding",
  },
  {
    coordinates: {latitude: 37.562211,longitude: 126.948445,},
    navigations: "HelBuilding",
  },
  {
    coordinates: { latitude: 37.562716, longitude: 126.94932 },
    navigations: "LawBuilding",
  },
  {
    coordinates: { latitude: 37.562552, longitude: 126.946382 },
    navigations: "PhyBuilding",
  },
  {coordinates: { latitude: 37.560937, longitude: 126.949237 },
    navigations: "MusBuilding",
  },
  {
    coordinates: {latitude: 37.561734,longitude: 126.943502,},
    navigations: "SkBuilding",
  },
  {
    coordinates: { latitude: 37.561641, longitude: 126.942348 },
    navigations: "BusBuilding",
  },
  {
    coordinates: { latitude: 37.562072, longitude: 126.944626 },
    navigations: "LivBuilding",
  },
];


const Container = styled.SafeAreaView`
  background-color: #ffffff;
  align-items: "left";
`;

const Map = ({ navigation }) => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied.");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  return (
    <Container>
      <MapView //지도 화면 
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: 37.562225,
          longitude: 126.946862,
          latitudeDelta: 0.01,
          longitudeDelta: 0.006,
        }}
        showsUserLocation={true}
        maxZoomLevel={30}
      >
        {gateData.map(
          //편하게 지나가는 문 위치 표시하는 마커
          (item, index) => (
            <Marker key={index} coordinate={item.coordinates}>
              <MaterialCommunityIcons name="door" size={15} color="black" />
            </Marker>
          )
        )}

        {hardGateData.map(
          //계단이 있으나 경사로가 존재하지 않는 문 위치 표시하는 마커
          (item, index) => (
            <Marker key={index} coordinate={item.coordinates}>
              <MaterialIcons name="sensor-door" size={13} color="gray" />
            </Marker>
          )
        )}

        {Building.map(
          //건물들 표시하는 마커
          (item, index) => (
            <Marker
              key={index}
              coordinate={item.coordinates}
              onPress={() => navigation.navigate(item.navigations)}
            >
              <FontAwesome5 name="map-marker-alt" size={30} color="red" />
            </Marker>
          )
        )}
      </MapView>
      <StatusBar style="auto" />
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  smallLogo: {
    height: 10,
    width: 10,
  },
});

export default Map;