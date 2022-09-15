// import React from 'react';
// import styled from 'styled-components';

// const Container = styled.View`
//   flex : 1;
//   background-color: ${ ({theme}) => theme.bgColor};
//   align-items: center;
//   justify-content: center;
// `;

// const StyledText = styled.Text`
//   font-size: 24px;
//   color: ${ ({theme}) => theme.text};
// `;

// const Map = ({navigation})=> {
//   return (
//     <Container>
//       <StyledText>Map</StyledText>
//     </Container>
//   );
// } 

// export default Map;


import { Button } from "react-native";
import styled from "styled-components";
import { StatusBar } from "expo-status-bar";
import React, { useLayoutEffect, useState, useEffect } from "react";
import { View, StyleSheet, Dimensions, Image } from "react-native";
import * as Location from "expo-location";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
//import { Text, Overlay, Icon } from "react-native-elements";
//import location from "./MakeWarning";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

let gateData = [
  //공학관 출입구
  { coordinates: { latitude: 37.566362, longitude: 126.948557 } }, //
  { coordinates: { latitude: 37.566693, longitude: 126.948784 } },
  { coordinates: { latitude: 37.566944, longitude: 126.948496 } },
  { coordinates: { latitude: 37.566561, longitude: 126.948155 } }, //
  //중앙도서관 출입구
  { coordinates: { latitude: 37.56186, longitude: 126.949581 } }, //
  { coordinates: { latitude: 37.562091, longitude: 126.948829 } }, //
  { coordinates: { latitude: 37.561676, longitude: 126.949057 } },
  //헬렌관 출입구
  { coordinates: { latitude: 37.562007, longitude: 126.948639 } },
  { coordinates: { latitude: 37.5622, longitude: 126.948164 } }, //
  //음악관 출입구
  { coordinates: { latitude: 37.560857, longitude: 126.949116 } },
  { coordinates: { latitude: 37.560755, longitude: 126.94943 } }, //
  { coordinates: { latitude: 37.560946, longitude: 126.949663 } },
  //법학관 출입구
  { coordinates: { latitude: 37.563094, longitude: 126.949505 } }, //
  { coordinates: { latitude: 37.562954, longitude: 126.949108 } },
  { coordinates: { latitude: 37.562729, longitude: 126.949132 } },
  { coordinates: { latitude: 37.563116, longitude: 126.949111 } },
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
    //위에
    <Container>
      <Button title="=" onPress={() => navigation.navigate("DrawerNav")} />

      <MapView //지도구현 부분
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
          (
            item,
            index //문 위치 표시하는 거
          ) => (
            <Marker key={index} coordinate={item.coordinates}>
              <MaterialIcons name="sensor-door" size={15} color="gray" />
            </Marker>
          )
        )}

        <Marker //공학관 마커
          coordinate={{
            latitude: 37.566463,
            longitude: 126.948375,
          }}
          onPress={() => navigation.navigate("BuildingGongHak")}
        >
          <FontAwesome5 name="map-marker-alt" size={30} color="red" />
          {/* <Image
              source={{
                uri: "https://ifh.cc/g/ohaHbB.png", //공학관 전경 이미지로 마커를 표시할 경우
              }}
              style={{ height: 45, width: 45 }}
            /> */}
        </Marker>

        <Marker //과학관 마커
          coordinate={{
            latitude: 37.564098,
            longitude: 126.947481,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          title={"과학관"}
          description={"종합과학관 A, B, C, D동"}
        >
          <FontAwesome5 name="map-marker-alt" size={30} color="red" />
        </Marker>

        <Marker //중앙도서관 마커
          coordinate={{
            latitude: 37.561956,
            longitude: 126.949204,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          title={"중앙도서관"}
          description={"중앙 도서관"}
        >
          <FontAwesome5 name="map-marker-alt" size={30} color="red" />
        </Marker>

        <Marker //대강당 마커
          coordinate={{
            latitude: 37.561309,
            longitude: 126.944952,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          title={"대강당"}
          description={"대강당"}
        >
          <FontAwesome5 name="map-marker-alt" size={30} color="red" />
        </Marker>

        <Marker
          coordinate={{
            latitude: 37.561029,
            longitude: 126.94804,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          title={"조예관"}
          description={"조형 예술관 A, B, C동"}
        >
          <FontAwesome5 name="map-marker-alt" size={30} color="red" />
        </Marker>

        <Marker
          coordinate={{
            latitude: 37.562211,
            longitude: 126.948445,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          title={"헬렌관"}
          description={"간호대"}
        >
          <FontAwesome5 name="map-marker-alt" size={30} color="red" />
        </Marker>

        <Marker
          coordinate={{
            latitude: 37.562716,
            longitude: 126.94932,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          title={"법학관"}
          description={"법학관"}
        >
          <FontAwesome5 name="map-marker-alt" size={30} color="red" />
        </Marker>

        <Marker
          coordinate={{
            latitude: 37.562552,
            longitude: 126.946382,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          title={"약학관"}
          description={"약학권 A, B동"}
        >
          <FontAwesome5 name="map-marker-alt" size={30} color="red" />
        </Marker>

        <Marker
          coordinate={{
            latitude: 37.560297,
            longitude: 126.944697,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          title={"박물관"}
          description={"100주년 기념 박물관"}
        >
          <FontAwesome5 name="map-marker-alt" size={30} color="red" />
        </Marker>

        <Marker
          coordinate={{
            latitude: 37.561025,
            longitude: 126.94654,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          title={"ECC"}
          description={"Ewha Complex"}
        >
          <FontAwesome5 name="map-marker-alt" size={30} color="red" />
        </Marker>

        <Marker
          coordinate={{
            latitude: 37.562472,
            longitude: 126.947616,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          title={"본관"}
          description={"본관"}
        >
          <FontAwesome5 name="map-marker-alt" size={30} color="red" />
        </Marker>

        <Marker
          coordinate={{
            latitude: 37.560937,
            longitude: 126.949237,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          title={"음악관"}
          description={"음악관"}
        >
          <FontAwesome5 name="map-marker-alt" size={30} color="red" />
        </Marker>

        <Marker
          coordinate={{
            latitude: 37.564216,
            longitude: 126.945645,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          title={"인문관"}
          description={"인문관"}
        >
          <FontAwesome5 name="map-marker-alt" size={30} color="red" />
        </Marker>

        <Marker
          coordinate={{
            latitude: 37.564945,
            longitude: 126.946378,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          title={"교육관"}
          description={"교육관 A, B동"}
        >
          <FontAwesome5 name="map-marker-alt" size={30} color="red" />
        </Marker>

        <Marker
          coordinate={{
            latitude: 37.563501,
            longitude: 126.94685,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          title={"포스코관"}
          description={"포스코관 수업동, 연구동"}
        >
          <FontAwesome5 name="map-marker-alt" size={30} color="red" />
        </Marker>

        <Marker
          coordinate={{
            latitude: 37.561734,
            longitude: 126.943502,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          title={"SK관"}
          description={"융합학부"}
        >
          <FontAwesome5 name="map-marker-alt" size={30} color="red" />
        </Marker>

        <Marker
          coordinate={{
            latitude: 37.561641,
            longitude: 126.942348,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          title={"신세계관"}
          description={"경영대"}
        >
          <FontAwesome5 name="map-marker-alt" size={30} color="red" />
        </Marker>

        <Marker
          coordinate={{
            latitude: 37.562072,
            longitude: 126.944626,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          title={"생활환경관"}
          description={"생활환경관"}
        >
          <FontAwesome5 name="map-marker-alt" size={30} color="red" />
        </Marker>

        <Marker
          coordinate={{
            latitude: 37.563429,
            longitude: 126.947615,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          title={"진선미관"}
          description={"진선미관"}
        >
          <FontAwesome5 name="map-marker-alt" size={30} color="red" />
        </Marker>

        <Marker
          coordinate={{
            latitude: 37.562617,
            longitude: 126.94556,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          title={"학문관"}
          description={"학생문화관"}
        >
          <FontAwesome5 name="map-marker-alt" size={30} color="red" />
        </Marker>

        {/* {markers.map((Warningmarker, index) => (
            <Marker>
              key={index}
              coordinate={Warningmarker.latlng}
              title={"장애물"}
            </Marker>
          ))} */}
      </MapView>
      <StatusBar style="auto" />
      {/*  <Overlay
          overlayStyle={{ height: "auto", justifyContent: "right" }}
          isVisible
        >*/}

      {/*
      // 장애물 추가 버튼 
      <Button
        title={"장애물추가"}
        onPress={() => navigation.navigate("MakeWarning")}
        backgroundColor={"red"}
      /> */}

      {/* </Overlay>>*/}
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
    height: "90%",
    alignContent: "flex-start",
  },
  smallLogo: {
    height: 10,
    width: 10,
  },
});

export default Map;