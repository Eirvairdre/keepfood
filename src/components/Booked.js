import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Text,
  View,
  Pressable,
  SafeAreaView,
  Dimensions,
  AsyncStorage,
} from 'react-native';
import SvgUri from 'react-native-svg-uri';
import {recipesRequest} from '../api/recipes';

export default function Booked({navigation}) {
  const [booked, setBooked] = useState();
  const [token, setToken] = useState();
  useEffect(() => {
    AsyncStorage.getItem('@keepfood:token').then(r => setToken(r));
  });
  useEffect(() => {
    reqRecipes();
  }, [reqRecipes]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const reqRecipes = async () => {
    const r = await recipesRequest({
      token: token,
      page: 1,
    });
    for (let i = 0; i <= r.list.length - 1; i++) {
      console.log(i);
      if (r.list[i].bookmarked === true) {
        setBooked(prevState => ({...prevState}));
        console.log(' =', i);
        console.log(booked);
      }
    }
  };
  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: 'white', alignItems: 'center'}}>
      <View style={{marginLeft: 20, marginRight: 20}}>
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            width: Dimensions.get('window').width - 40,
            // justifyContent: 'space-between',
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
            Ваши избранные блюда:
          </Text>
        </View>
        <FlatList
          style={{backgroundColor: '#FFA011', margin: 10}}
          data={booked}
          renderItem={({item}) => {
            return (
              <View>
                <Text
                  style={{color: 'white', textAlign: 'center', fontSize: 40}}>
                  {item.name}
                </Text>
              </View>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
}
