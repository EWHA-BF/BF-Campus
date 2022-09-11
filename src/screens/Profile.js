import React, {useContext} from 'react';
import styled from 'styled-components';
import {Button, Input} from '../components';
import {UserContext} from '../contexts';
import {getCurUser} from '../firebase';
import {auth} from '../firebase';
import {signOut} from 'firebase/auth';
import {Alert} from 'react-native';

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

  // 로그아웃 함수
  const signout= async ()=> {
    await signOut(auth);
    return {};
  }

  return (
    <Container>
      <Input 
      label='name' 
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

      // 로그아웃 및 user 업데이트
      onPress={ async () => {
        try{
          await signout();
        }
        catch(e){
          console.log(e.message);
          Alert.alert("로그아웃 실패"); 
        }
        finally{
          setUser({});
        }
      }}

      containerStyle={{
        padding: 15,
        marginTop: 15,
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