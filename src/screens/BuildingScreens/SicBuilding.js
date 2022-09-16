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
  font-size: 22px;
  color: ${({ theme }) => theme.text};
  font-weight: 600;
  margin: 10px 0;
  text-align: center;
`;

const StyledText = styled.Text`
  font-size: 16px;
  color: ${({ theme }) => theme.text};
  font-weight: 500;
  padding: 10px 20px;
  text-align: center;
  line-height: 30px;
  background-color: #bae2c8;
`;

const SicBuilding = ({ navigation }) => {
  const theme = useContext(ThemeContext);

  return (
    <Container>
      <StyledTitle>종합과학관 A동</StyledTitle>
      <StyledText>
        엘리베이터 이용 가능
        {"\n"}경사로 이용 불가능
      </StyledText>
      <StyledTitle>종합과학관 B동</StyledTitle>
      <StyledText>
      엘리베이터, 경사로 이용 가능
      </StyledText>
      <StyledTitle>종합과학관 C동</StyledTitle>
      <StyledText>
        출입문: 1층
        {"\n"}엘리베이터, 경사로 이용 가능
      </StyledText>
      <StyledTitle>종합과학관 D동</StyledTitle>
      <StyledText>
        출입문: 지하2층, 4층
        {"\n"}엘리베이터, 경사로 이용 가능
      </StyledText>
      <Button
        title="게시판으로 이동"
        onPress={() =>
          navigation.navigate("Board", {
            id: "SicBoard",
            title: "종합과학관",
          })
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

export default SicBuilding;