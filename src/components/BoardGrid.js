//홈 화면에 띄울 나의 게시판 Grid - 사용할 수 있으면 하기

import React, {useState, useContext} from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { DraxProvider, DraxView, DraxList } from 'react-native-drax';
import {ThemeContext} from 'styled-components';


//전체 컨테이너
const gestureRootViewStyle = { 
  flex:1, 
  width: '95%',
  backgroundColor: 'white'
};



export default function BoardGrid() {
  const theme=useContext(ThemeContext);

  //data
  const draggableItemList = [
    {
      "id": 1,
      "name": "교육관",
      "background_color": "red"
    },
    {
      "id": 2,
      "name": "종합과학관",
      "background_color": "pink"
    },
    {
      "id": 3,
      "name": "조형예술관",
      "background_color": "orange"

    },
    {
      "id": 4,
      "name": "음악관",
      "background_color": "#aaaaff"
    },
    {
      "id": 5,
      "name": "중앙도서관",
      "background_color": "blue"
    },
    {
      "id": 6,
      "name": "법학관",
      "background_color": "green"
    },
    {
      "id": 7,
      "name": "SK관",
      "background_color": "brown"

    },
    {
      "id": 8,
      "name": "H",
      "background_color": "#aaaaff"
    },
    {
      "id": 9,
      "name": "I",
      "background_color": "red"
    },
    {
      "id": 10,
      "name": "J",
      "background_color": "pink"
    },
    {
      "id": 11,
      "name": "K",
      "background_color": "orange"

    },
    {
      "id": 12,
      "name": "L",
      "background_color": "#aaaaff"
    }

  ];
  const FirstReceivingItemList = [
    {
      "id": 13,
      "name": "공학관",
      "background_color": theme.ewha_green,
    },
    {
      "id": 14,
      "name": "ECC",
      "background_color": '#ffaaff'
    },
    {
      "id": 15,
      "name": "포스코관",
      "background_color": '#ffaaff'
    },
    {
      "id": 16,
      "name": "학문관",
      "background_color": '#ffaaff'
    }
  ];


 
  

  const [receivingItemList, setReceivedItemList] = useState(FirstReceivingItemList);
  const [dragItemMiddleList, setDragItemListMiddle] = useState(draggableItemList);




  //아이템
  const DragUIComponent = ({ item, index }) => {
    return (
      <DraxView
        style={[styles.centeredContent, styles.draggableBox, { backgroundColor: item.background_color }]}
        draggingStyle={styles.dragging}
        dragReleasedStyle={styles.dragging}
        hoverDraggingStyle={styles.hoverDragging}
        dragPayload={index}
        longPressDelay={150}
        key={index}
      >
        <Text style={styles.textStyle}>{item.name}</Text>
      </DraxView>
    );
  }


  //윗 부분
  const ReceivingZoneUIComponent = ({ item, index }) => {
    return (
      <DraxView
        style={[styles.centeredContent, styles.receivingZone, { backgroundColor: item.background_color }]}
        receivingStyle={styles.receiving}
        renderContent={({ viewState }) => {
          const receivingDrag = viewState && viewState.receivingDrag;
          const payload = receivingDrag && receivingDrag.payload;
          return (
            <View>
              <Text style={styles.textStyle}>{item.name}</Text>
            </View>
          );
        }}
        key={index}
        onReceiveDragDrop={(event) => {
          let selected_item = dragItemMiddleList[event.dragged.payload];
          console.log('onReceiveDragDrop::index', selected_item, index);
          console.log('onReceiveDragDrop :: payload', event.dragged.payload);
          let newReceivingItemList = [...receivingItemList];
          console.log('onReceiveDragDrop :: newReceivingItemList', newReceivingItemList);
          newReceivingItemList[index] = selected_item;
          setReceivedItemList(newReceivingItemList);

          let newDragItemMiddleList = [...dragItemMiddleList];
          console.log('onReceiveDragDrop :: newDragItemMiddleList 1', newDragItemMiddleList);
          newDragItemMiddleList[event.dragged.payload] = receivingItemList[index];
          console.log('onReceiveDragDrop :: newDragItemMiddleList 2', newDragItemMiddleList);
          setDragItemListMiddle(newDragItemMiddleList);
        }}
      />
    );
  }


  //여백 
  const FlatListItemSeparator = () => {
    return (<View style={styles.itemSeparator} />);
  }

  
  return (
    //전체 화면
    <GestureHandlerRootView
      style={gestureRootViewStyle}>

      {/* 헤더 */}
      <View style={styles.headerStyle}>
        <Text style={styles.headerText}>{'나의 게시판'}</Text>
        {/* 편집 버튼 */}
        <TouchableOpacity
              onPress={
                ()=>{setIsEdit(true);}
              }
              style={{
                width: 43,
                height: 30,
                color: 'black',
                marginLeft: (Dimensions.get('window').width) - 200,
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 1,
                borderColor: theme.ewha_green,
                borderRadius: 8,
              }}><Text
              style={{
                fontSize: 14,
                fontWeight: 'bold',
                color: theme.ewha_green
              }}>편집</Text>
            </TouchableOpacity>
      </View>



      <DraxProvider>
        {/* 아이템 부분 */}
        <View style={styles.container}>
          
          {/* 윗 부분 */}
          <View style={styles.receivingContainer}>
            {/* 여기 */}
            {receivingItemList.map((item, index) => ReceivingZoneUIComponent({ item, index }))}
          </View>
          {/* 아랫 부분 */}
          {/* <View style={styles.draxListContainer}>
            
            <DraxList
              data={dragItemMiddleList}
              renderItemContent={DragUIComponent}
              keyExtractor={(item, index) => index.toString()}
              numColumns={4}
              ItemSeparatorComponent={FlatListItemSeparator}
              scrollEnabled={true}
            /> 
            
          </View> */}

        </View>
      </DraxProvider>
    </GestureHandlerRootView>
  );
}



const styles = StyleSheet.create({
  // 아이템 부분 컨테이너
  container: {
    height: 100,
    padding: 12,
    paddingTop: 0,
    justifyContent: 'space-evenly',
  },
  
  centeredContent: {
    borderRadius: 10,
  },

  //윗 부분 아이템
  receivingZone: {
    height: (Dimensions.get('window').width / 4) - 20,
    borderRadius: 10,
    width: (Dimensions.get('window').width / 4) - 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  receiving: {
    borderColor: 'red',
    borderWidth: 2,
  },
  //아랫 부분 아이템
  draggableBox: {
    width: (Dimensions.get('window').width / 4) - 20,
    height: (Dimensions.get('window').width / 4) - 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal:3,
  },
  dragging: {
    opacity: 0.2,
  },
  hoverDragging: {
    borderColor: 'magenta',
    borderWidth: 2,
  },

  //윗 부분 컨테이너
  receivingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    backgroundColor: 'white',
  },

  //여백
  itemSeparator: {
    height: 15,
  },

  // 아랫 부분 컨테이너
  draxListContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 5,
    height: 400,
    backgroundColor: 'white',
  },

  receivingZoneContainer: {
    padding: 5,
    height: 100
  },

  //아이템 글자
  textStyle: {
    fontSize: 16,
    color: 'white',
  },

  //헤더
  headerStyle: {
    flexDirection: 'row',
    height: 40,
    width: (Dimensions.get('window').width) - 20*3,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 30,
    marginLeft: 20
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  }
});








