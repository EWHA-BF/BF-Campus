import React, { useContext } from "react";
import styled, { ThemeContext } from "styled-components";
import { Button } from "../../components";
import { StyleSheet } from "react-native";
import { View } from "react-native";
import { theme } from "../../theme";

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.bgColor};
  align-items: center;
  justify-content: space-evenly;
`;

const StyledTitle = styled.Text`
  font-size: 30px;
  color: ${({ theme }) => theme.text};
  font-weight: 600;
  margin: 10px 0;
  text-align: center;
`;

const StyledText = styled.Text`
  font-size: 20px;
  color: ${({ theme }) => theme.text};
  font-weight: 500;
  padding: 20px 30px;
  text-align: center;
  line-height: 40px;
  background-color: #bae2c8;
`;

const EduBuilding = ({ navigation }) => {
  const theme = useContext(ThemeContext);

  return (
    <Container>
      <StyledTitle>교육관 A동</StyledTitle>
      <StyledText>
        출입문: 1층
        {"\n"}엘리베이터, 경사로 이용 가능
      </StyledText>
      <StyledTitle>교육관 B동</StyledTitle>
      <StyledText>
        출입문: 지하1층, 1층
        {"\n"}엘리베이터, 경사로 이용 가능
      </StyledText>
      <Button
        title="게시판으로 이동"
        onPress={() =>
          navigation.navigate("Board", { id: "EduBoard", title: "교육관" })
        }
        bgColor={theme.dark_gray}
        color={theme.white}
        containerStyle={{
          padding: 15,
          marginTop: 0,
          marginBottom: 25,
          borderRadius: 30,
          marginHorizontal: 20,
        }}
        textStyle={{
          fontSize: 20,
          fontWeight: "600",
        }}
      />
    </Container>
  );
};

export default EduBuilding;