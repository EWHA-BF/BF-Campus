// import React, {Component, useContext} from 'react'
// import {Dimensions} from 'react-native'
// import {AutoDragSortableView} from '../components';
// import styled, {ThemeContext} from 'styled-components';
// import { Ionicons } from '@expo/vector-icons';
// import { TouchableOpacity } from 'react-native-gesture-handler';



// //=-=-=-=- 고정 기능 X =-=-=-=-=
// //검색 기능 구현하기!!

// // 화면의 가로 길이
// const {width} = Dimensions.get('window')
// const parentWidth = width

// // item의 가로 길이
// const childrenWidth = width - 20

// // item의 세로 길이
// const childrenHeight = 48


// //styled components
// const Container = styled.SafeAreaView`
//     flex: 1;
//     background-color: ${ ({theme}) => theme.bgColor};
// `

// const Header = styled.View`
//     height: 48px;
//     flex-direction: row;
//     justify-content: space-between;
//     align-items: center;
//     border-bottom-color: ${ ({theme}) => theme.light_grey};
//     border-bottom-width: 1px;
//     margin-bottom: 20px;
//     color: ${ ({theme}) => theme.ewha_green};
// `;

// const StyledText=styled.Text`
//     color: ${ ({theme}) => theme.ewha_green};
//     font-size: 20px;
// `;

// const Item = styled.View`
//     width: ${childrenWidth}px;
//     height: ${childrenHeight}px;
//     flex-direction: row;
//     justify-content: space-between;
//     align-items: center;
//     background-color: ${ ({theme}) => theme.ewha_green};
//     border-radius: 10px;
// `;

// // icon 영역
// const ItemIconSwipe = styled.View`
//     width: ${childrenHeight-10}px;
//     height: ${childrenHeight-10}px;
//     background-color: ${ ({theme}) => theme.ewha_green};
//     margin: 0 20px;
//     justify-content: center;
//     align-items: center;
// `;



// //DB에서 불러오는 걸로 수정
// export const _DATA = [
//   {txt: '공학관', noti: false},
//   {txt: 'ECC', noti: false},
//   {txt: '포스코관', noti: false},
//   {txt: '교육관', noti: false},
//   {txt: '학문관', noti: false},
//   {txt: '조형예술관', noti: false},
//   {txt: '음악관', noti: false},
//   {txt: '중앙도서관', noti: false},
//   {txt: '법학관', noti: false},
//   {txt: 'SK관', noti: false},
// ]



// export default class BoardList extends Component {



//     constructor(props) {
//         super(props)

//         this.state = { 
//             data: _DATA, 
//         }
//     }

//     static contextType = ThemeContext;

//     render() {
        
//         return (
//             <Container>
//               {/* --헤더--
//               <Header>
//                 {/* 뒤로 가기 버튼 
//                 <Ionicons 
//                     name="ios-chevron-back-outline" 
//                     size={25}
//                     style={{marginLeft: 10, color: '#00462a'}}
//                     onPress={()=> {this.props.navigation.goBack()}}/>
//                 {/* 헤더 텍스트 
//                 <StyledText style={{
//                     fontWeight: 'bold',
//                 }}>
//                 게시판 목록
//                 </StyledText>
//                 {/* 투명 아이콘 
//                 <Ionicons 
//                 name="ios-chevron-back-outline" 
//                 size={25}
//                 style={{marginRight: 10}}
//                 color='transparent'/>
//               </Header> */}

//               {/* --목록-- */}
//               <AutoDragSortableView
//                 dataSource={this.state.data}
//                 parentWidth={parentWidth}
//                 childrenWidth= {childrenWidth}
//                 marginChildrenBottom={10}
//                 marginChildrenRight={10}
//                 marginChildrenLeft = {10}
//                 marginChildrenTop = {10}
//                 childrenHeight={childrenHeight}
                

//                 //data 변화 반영
//                 onDataChange = {(data)=>{
//                     if (data.length != this.state.data.length) {
//                         this.setState({
//                             data: data
//                         })
//                     }
//                 }}

//                 keyExtractor={(item)=> item.txt} 
//                 // 아이템 렌더링
//                 renderItem={(item,index)=>{
//                     return this.renderItem(item,index)
//                 }}
//                 />
//             </Container>
//         )
//     }


//     //아이템 렌더링 함수
//     renderItem(item,index) {
        
//         // fixedItems 인지 확인하고 boolean 값을 isFixed에 저장
//         // const isFixed = fixedItems.includes(index);

//         // isFixed 여부에 따라 렌더링 다르게 (생략함)
        
//         return (
//             <TouchableOpacity 
//             // 게시판으로 화면 이동
//             onPress={()=>this.props.navigation.navigate('EngBoard')}
//             onLongPress={() => {}}
//             delayLongPress={1000}
//             >
//             <Item>
//                 {/* 정렬 아이콘 */}
//                 <ItemIconSwipe>
//                     <Ionicons 
//                     name="menu-outline" 
//                     style={{
//                         fontSize: 22,
//                         color: 'white'
//                     }}/> 
//                 </ItemIconSwipe>

//                 {/* 텍스트 */}
//                 <StyledText style={{
//                     fontSize: 18,
//                     color: 'white',
                    
//                 }}>{item.txt}</StyledText>

//                 {/* 알림 아이콘 */}
//                 <ItemIconSwipe>
//                     {(item.noti)? 
//                     <Ionicons 
//                     name="notifications" 
//                     style={{
//                         fontSize: 23,
//                         color: 'white',
//                     }}
//                     onPress={
//                         ()=> {
//                             item.noti=!item.noti; 
//                             this.setState(_DATA);
//                         }
//                     }/>
//                     :
//                     <Ionicons 
//                     name="notifications-off-outline" 
//                     style={{
//                         fontSize: 23,
//                         color: 'white',
//                     }}
//                     onPress={
//                         ()=> {
//                             item.noti=!item.noti; 
//                             this.setState(_DATA);
//                         }
//                     }/>}
//                 </ItemIconSwipe>
//             </Item>
//             </TouchableOpacity>
//         )
//     }
// }
