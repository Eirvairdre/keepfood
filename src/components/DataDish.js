import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Image,
  FlatList,
  ScrollView,
  Pressable,
  Dimensions,
  AsyncStorage,
  Alert,
} from 'react-native';
import {useRoute} from '@react-navigation/native';
import SvgUri from 'react-native-svg-uri';
import {getRecipe} from '../api/recipes';
import {likeRequest} from '../api/recommends';
import {baseStorageUrl} from '../api/base';
import Loader from './Loader';

function Dish({navigation}) {
  const route = useRoute();
  const {recipe_id} = route.params;
  const [data, setData] = useState(false);
  const [token, setToken] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('@keepfood:token').then(r => setToken(r));
  });
  useEffect(() => {
    getRecipe(recipe_id, token).then(r => setData(r));
    // .catch(_ => setData(false));
  }, [recipe_id, token]);
  return data ? (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: '#FFFFFF',
        position: 'relative',
        width: '100%',
      }}>
      {/*<Text*/}
      {/*  style={{*/}
      {/*    position: 'absolute',*/}
      {/*    color: 'black',*/}
      {/*    lineHeight: 30.67,*/}
      {/*    fontSize: 24,*/}
      {/*    fontFamily: 'Mont-Bold',*/}
      {/*    marginTop: 300,*/}
      {/*    textAlign: 'center',*/}
      {/*    //flex: 1,*/}
      {/*  }}>*/}
      {/*  {data.name}*/}
      {/*</Text>*/}
      <View
        style={{
          position: 'absolute',
          zIndex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: Dimensions.get('window').width - 40,
          margin: 20,
          marginTop: 50,
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
        <Pressable
          onPress={() => {
            likeRequest(token, data.id, !data.liked).catch(console.error);
          }}
          style={{
            width: 48,
            height: 48,
            backgroundColor: '#F8F8F8',
            borderRadius: 15,
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}>
          <SvgUri source={require('../../assets/images/misc/heart_1.svg')} />
        </Pressable>
      </View>
      <View
        style={{
          position: 'absolute',
          zIndex: 1,
          marginLeft: 20,
          marginRight: 20,
          alignItems: 'center',
          marginTop: 223,
        }}>
        <Text
          style={{
            color: 'white',
            lineHeight: 30.67,
            fontSize: 24,
            fontFamily: 'Mont-Bold',
          }}>
          {data.name}
        </Text>
      </View>
      <Image
        source={{uri: baseStorageUrl + data.icon}}
        style={{width: '100%', height: 310}}
      />
      <View style={{marginLeft: 20, marginRight: 20, position: 'relative'}}>
        <Text
          style={{
            color: '#9C9C9C',
            fontFamily: 'Mont-Regular',
            fontSize: 14,
            lineHeight: 21,
            marginTop: 22,
          }}>
          {data.desc}
        </Text>
        <Text
          style={{
            fontFamily: 'Mont-Bold',
            fontSize: 14,
            lineHeight: 21,
            marginTop: 27,
          }}>
          Ингридиенты
        </Text>
        <FlatList
          style={{position: 'relative', marginTop: 15}}
          scrollEnabled={false}
          data={data.products}
          renderItem={({item}) => (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                borderBottomWidth: 1,
                borderBottomColor: '#F8F8F8',
                borderTopWidth: 1,
                borderTopColor: '#F8F8F8',
                height: 47,
                alignItems: 'center',
                position: 'relative',
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text
                  style={{
                    fontFamily: 'Mont-Regular',
                    fontWeight: '600',
                    fontSize: 14,
                    lineHeight: 17.07,
                  }}>
                  {item.name}
                </Text>
              </View>
              <Text>
                <Text
                  style={{
                    fontFamily: 'Mont-Regular',
                    fontSize: 14,
                    fontWeight: '500',
                    lineHeight: 17.07,
                  }}>
                  {item.quantity === 0 ? '' : item.quantity}
                </Text>
                <Text
                  style={{
                    fontFamily: 'Mont-Regular',
                    fontSize: 14,
                    fontWeight: '500',
                    lineHeight: 17.07,
                  }}>
                  {' '}
                  {item.quantity === 0 ? 'по вкусу' : item.quantity_type}
                </Text>
              </Text>
            </View>
          )}
        />
        {/*<RecipeDescriptionComponent*/}
        {/*  recipe_id={route.params.recipe_id}*/}
        {/*  token={token}*/}
        {/*/>*/}
        <View style={{marginBottom: 20, position: 'relative', marginTop: 20}}>
          <Pressable
            onPress={() => {
              navigation.navigate('OrderShops', {
                recipe_id: route.params.recipe_id,
                data: route.params.data,
              });
            }}
            style={{
              height: 54,
              width: '100%',
              backgroundColor: '#FFFFFF',
              borderRadius: 16,
              borderColor: '#FFA011',
              borderWidth: 2,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                color: '#FFA011',
                fontFamily: 'Mont-Regular',
                fontSize: 14,
                fontWeight: '700',
              }}>
              Заказать ингредиенты
            </Text>
          </Pressable>
          <Pressable
            onPress={() =>
              navigation.navigate('Recipe', {
                recipe_id: route.params.recipe_id,
                token: token,
              })
            }
            style={{
              height: 54,
              top: 20,
              marginBottom: 40,
              width: '100%',
              backgroundColor: '#FFA011',
              borderRadius: 16,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                color: '#FFFFFF',
                fontFamily: 'Mont-Regular',
                fontSize: 14,
                fontWeight: '700',
              }}>
              Начать готовить
            </Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  ) : (
    <Loader />
  );
}

export default Dish;
