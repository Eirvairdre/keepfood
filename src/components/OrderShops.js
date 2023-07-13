import * as React from 'react';
import {
  View,
  Pressable,
  Text,
  Dimensions,
  SafeAreaView,
  FlatList,
  Image,
} from 'react-native';
import SvgUri from 'react-native-svg-uri';
import {baseStorageUrl} from '../api/base';
import {useRoute} from '@react-navigation/native';
import {marketsRequest} from '../api/order';
import {useEffect, useState} from 'react';

export default function OrderShops({navigation}) {
  const route = useRoute();
  const {recipe_id} = route.params;
  const {data} = route.params;
  const [markets, setMarkets] = useState(false);
  // const Data = [
  //   {
  //     id: 1,
  //     title: 'Магнит',
  //     price: '200$',
  //     time: 20,
  //   },
  //   {
  //     id: 2,
  //     title: 'Пятерочка',
  //     price: '100$',
  //     time: 30,
  //   },
  //   {
  //     id: 3,
  //     title: 'Азбука вкуса',
  //     price: '500$',
  //     time: 10,
  //   },
  //   {
  //     id: 4,
  //     title: 'ВкусВилл',
  //     price: '400$',
  //     time: 20,
  //   },
  //   {
  //     id: 5,
  //     title: 'Самокат',
  //     price: '300$',
  //     time: 10,
  //   },
  //   {
  //     id: 6,
  //     title: 'Лента',
  //     price: '200$',
  //     time: 20,
  //   },
  // ];

  useEffect(() => {
    marketsRequest()
      .then(r => setMarkets(r))
      .catch(e => console.log('!!', e));
  }, []);

  const _renderItem = ({item}) => {
    return (
      <View style={{flex: 1, marginHorizontal: 7, marginBottom: 20}}>
        <Pressable
          onPress={() => {
            navigation.navigate('OrderIngredients', {
              recipe_id: route.params.recipe_id,
              data: route.params.data,
              shop_id: item.id,
            });
          }}
          style={{
            height: 165,
            width: 165,
            backgroundColor: 'grey',
            alignItems: 'center',
            padding: 14,
            borderRadius: 20,
            justifyContent: 'center',
          }}>
          <Image
            source={{uri: baseStorageUrl + item.icon}}
            style={{
              width: 165,
              height: 165,
              resizeMode: 'contain',
              position: 'absolute',
              borderRadius: 20,
            }}
          />
          {/*<Text*/}
          {/*  style={{*/}
          {/*    color: 'white',*/}
          {/*    fontSize: 18,*/}
          {/*    fontFamily: 'Mont-Bold',*/}
          {/*    lineHeight: 21,*/}
          {/*    // justifyContent: 'center',*/}
          {/*  }}>*/}
          {/*  {item.name.toUpperCase()}*/}
          {/*</Text>*/}
          {/*<View*/}
          {/*  style={{*/}
          {/*    flexDirection: 'row',*/}
          {/*    justifyContent: 'space-between',*/}
          {/*    marginTop: 50,*/}
          {/*    width: '100%',*/}
          {/*  }}>*/}
          {/*  <Text*/}
          {/*    style={{*/}
          {/*      color: 'white',*/}
          {/*      fontSize: 14,*/}
          {/*      fontFamily: 'Mont-Bold',*/}
          {/*      lineHeight: 21,*/}
          {/*    }}>*/}
          {/*    {item.price}*/}
          {/*  </Text>*/}
          {/*  <Text*/}
          {/*    style={{*/}
          {/*      color: 'white',*/}
          {/*      fontSize: 14,*/}
          {/*      fontFamily: 'Mont-Bold',*/}
          {/*      lineHeight: 21,*/}
          {/*    }}>*/}
          {/*    {item.time}*/}
          {/*  </Text>*/}
          {/*</View>*/}
        </Pressable>
      </View>
    );
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
      }}>
      <View style={{marginLeft: 20, marginRight: 20}}>
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            width: Dimensions.get('window').width - 40,
          }}>
          <Pressable
            style={{
              width: 48,
              height: 48,
              backgroundColor: '#F8F8F8',
              borderRadius: 15,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => navigation.goBack()}>
            <SvgUri source={require('../../assets/images/misc/back.svg')} />
          </Pressable>
          <Text style={{fontFamily: 'Mont-Bold', fontSize: 20, marginLeft: 10}}>
            Выберите магазин
          </Text>
        </View>
        <FlatList
          data={markets}
          renderItem={_renderItem}
          scrollEnabled={false}
          numColumns={2}
          style={{marginTop: 20}}
        />
      </View>
    </SafeAreaView>
  );
}
