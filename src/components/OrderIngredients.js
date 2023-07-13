import * as React from 'react';
import {
  View,
  Pressable,
  Text,
  Dimensions,
  SafeAreaView,
  FlatList,
  Image,
  AsyncStorage,
  Alert,
  ScrollView,
} from 'react-native';
import SvgUri from 'react-native-svg-uri';
import {useRoute} from '@react-navigation/native';
import {useState, useEffect} from 'react';
import {getRecipe} from '../api/recipes';

export default function OrderIngredients({navigation}) {
  const route = useRoute();
  const {recipe_id} = route.params;
  const {shop_id} = route.params;
  const [data, setData] = useState(false);
  const [token, setToken] = useState(false);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem('@keepfood:token').then(r => setToken(r));
  });
  useEffect(() => {
    getRecipe(recipe_id, token).then(r => setData(r));
  }, [recipe_id, token]);

  console.log(selected);
  const handleOnPress = item => {
    selected.includes(item.id)
      ? setSelected(selected.filter(item_id => item_id !== item.id))
      : setSelected([...selected, item.id]);
  };
  console.log('!!', recipe_id);

  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: 'white', alignItems: 'center'}}>
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
            Выберите ингредиенты которые хотите заказать
          </Text>
        </View>
        <FlatList
          style={{position: 'relative', marginTop: 26}}
          scrollEnabled={true}
          data={data.products}
          renderItem={({item}) => (
            <Pressable
              onPress={() => {
                handleOnPress(item);
              }}
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
                <SvgUri
                  source={
                    selected.includes(item.id)
                      ? require('../../assets/images/misc/Box.svg')
                      : require('../../assets/images/misc/Check.svg')
                  }
                  style={{justifyContent: 'center', alignItems: 'center'}}
                />
                <Text
                  style={{
                    fontFamily: 'Mont-Regular',
                    fontWeight: '600',
                    fontSize: 14,
                    lineHeight: 17.07,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  {'  '}
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
            </Pressable>
          )}
        />
        <Pressable
          onPress={() => {
            navigation.navigate('OrderMap', {
              id: selected,
              recipe_id: route.params.recipe_id,
              token: token,
              shop_id: shop_id,
            });
          }}
          style={{
            height: 52,
            backgroundColor: '#FFA011',
            borderRadius: 16,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: 'white',
              fontFamily: 'Mont-Regular',
              fontSize: 14,
              lineHeight: 21,
            }}>
            Продолжить
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
