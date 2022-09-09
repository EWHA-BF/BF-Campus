import React, {useContext} from 'react';
import styled from 'styled-components';
import {Button, Input} from '../components';
import {UserContext} from '../contexts';
import {getCurUser} from '../firebase';

const Container = styled.View`
  flex : 1;
  background-color: ${ ({theme}) => theme.bgColor};
  align-items: center;
  justify-content: center;
  padding: 0 20px;
`;

const StyledText = styled.Text`
  font-size: 24px;
  color: ${ ({theme}) => theme.text};
`;

const Profile = ({navigation, route})=> {
  // user 정보 업데이트 위해 불러옴
  const {setUser} = useContext(UserContext);

  //현재 로그인한 사용자 정보 받아오기
  const curUser=getCurUser();

  return (
    <Container>
      <Input 
      label='name' 
      // name이 안 뜨는 문제 - 회원가입시 못 받은 것으로 추정
      value={curUser.displayName}
      disabled
      />
      <Input 
      label='email' 
      value={curUser.email}
      disabled
      />
      <Button 
      title="로그아웃" 

      // user 업데이트
      onPress={()=>setUser({})}

      containerStyle={{
        padding: 15,
        marginTop: 0,
        marginBottom: 25,
        borderRadius: 30,
      }}
      textStyle={{
        fontSize: 20,
        fontWeight: '600',
      }}
      />
    </Container>
  );
} 

export default Profile;