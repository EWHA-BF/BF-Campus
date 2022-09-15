import React from "react";
import styled from "styled-components";
import { Button, ImageBackground, Text } from "react-native";
import { StyleSheet } from "react-native";
import { View } from "react-native";
import { Image } from "react-native";

const image = { uri: "https://ifh.cc/g/GMGVH1.png" };

const StyledText = styled.Text`
  font-size: 30px;
  margin-bottom: 10px;
`;

const BuildingGongHak = ({ navigation }) => {
  return (
    <View style={styled.container}>
      <Text style={styles.title}>공학관</Text>
      <Text style={styles.text}>
        아산공학관과 신공학관을 통칭하여 부르는 말이다. 아산 공학관은 1996년
        봉헌식을 갖고 세계 최초로 여자대학 내에 설립된 이화의 공과대학 건물로 이
        건물을 기증한 현대그룹 정주영 명예 회장의 호를 따서 아산공학관이라
        명명됐다. 종합 과학관 위쪽에 위치한 지하1층, 지상 5층의 건물로
        첨단과학화를 선도하고 현대 산업사회에 기여하는 고급과학 기술 인재를
        양성하는 구심점이 되고 있다.
      </Text>
      <Text style={styles.text}>
        신공학관은 지상 5층, 지하 3층 규모의 공학 분야 전문 연구를 위한
        공간이다. 엘텍공과대학의 전공별 실험실, 행정실, 교수연구실, 공학도서관,
        컴퓨터실, 첨단 강의실 등의 교육 연구 시설과 학생식당, 학생회실,
        자유열람실 등의 학생 복지 시설로 구성되어 있다.
      </Text>
      <Button
        title={"게시판으로 이동"}
        onPress={() => 
          navigation.navigate("EngBoard", {id: 'Engboard', title: '공학관'})
        }
      >
      </Button>
      <Image style={styles.image} source={image}></Image>
      {/* <Button title={"게시판으로 이동"}> </Button> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "40%",
    alignItems: "baseline",
    justifyContent: "flex-end",
  },
  title: {
    color: "black",
    fontSize: 24,
    lineHeight: 48,
    textAlign: "center",
    fontWeight: "bold",
  },
  text: {
    color: "black",
    fontSize: 15,
    lineHeight: 17,
    textAlign: "flex-start",
  },
});

export default BuildingGongHak;