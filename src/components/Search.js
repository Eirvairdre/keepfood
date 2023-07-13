import * as React from 'react';
import {
  Text,
  View,
  TextInput,
  FlatList,
  Image,
  StyleSheet,
  Pressable,
  Keyboard,
} from 'react-native';
import normalize from 'react-native-normalize';
import MyIcon from '../../assets/fonts/icon-font';
import {productsRequest} from '../api/products';
import {useEffect, useState} from 'react';
import {recipesRequest} from '../api/recipes';
import {baseStorageUrl} from '../api/base';

function Search({navigation}) {
  const INFO = [
    {
      id: 1,
      name: 'Подборки традиционных блюд Дальнего В...',
      image: require('../../assets/images/photo.jpg'),
      category: 'подборка',
    },
    {
      id: 2,
      name: 'Чем питаются юные политологи? Расскажет Лаура',
      image: require('../../assets/images/laura.jpg'),
      category: 'медиа',
    },
    {
      id: 3,
      name: 'Подборка закусок для вечеринки от @vita_neko',
      image: require('../../assets/images/pod.jpg'),
      category: 'блогер',
    },
    {
      id: 4,
      name: 'Подборка напитков, чтобы быть зимой',
      image: require('../../assets/images/23.png'),
      category: 'подборка',
    },
  ];

  const [sItem, setSItem] = useState(false);
  const [products, setProducts] = useState(false);
  const [ingr, setIngr] = useState(false);

  useEffect(() => {
    reqRecipes();
  }, [sItem, reqRecipes]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const reqRecipes = async () => {
    //const token = await AsyncStorage.getItem('@keepfood:token');
    const r = await recipesRequest({
      name: sItem,
      page: 1,
    });
    try {
      setProducts(r.list);
      // let prod = products.map(({name}) => name);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    reqIngr();
  }, [reqIngr]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const reqIngr = async () => {
    //const token = await AsyncStorage.getItem('@keepfood:token');
    const r = await productsRequest({
      page: 1,
    });
    try {
      setIngr(r.list);
      //let prod = products.map(({name}) => name);
    } catch (err) {
      console.error(err);
    }
  };
  const _renderSlider = ({item}) => {
    return (
      <View style={{marginRight: 7, alignItems: 'center'}}>
        <Image
          source={{uri: baseStorageUrl + item.icon}}
          style={{height: 107, width: 107, borderRadius: 20}}
        />
        <Text
          style={{
            fontFamily: 'Mont-Regular',
            marginTop: 10,
            lineHeight: 21,
            fontWeight: '600',
          }}>
          {item.name.length >= 10 ? item.name.slice(0, 11) + '...' : item.name}
        </Text>
      </View>
    );
  };

  const _renderItem = ({item}) => {
    return (
      <Pressable
        onPress={() => {
          setSItem('');
          Keyboard.dismiss();
          navigation.navigate('Dish', {recipe_id: item.id});
        }}
        style={{
          height: 52,
          borderRadius: 15,
          backgroundColor: '#F8F8F8',
          marginBottom: 10,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 10,
        }}>
        {/*<Image source={baseUrl + item.icon} style={{borderRadius: 20}} />*/}
        <Text
          style={{
            fontSize: 14,
            lineHeight: 21,
            fontWeight: '600',
            fontFamily: 'Mont-Regular',
            color: '#000000',
          }}>
          {item.name.length >= 29 ? item.name.slice(0, 29) + '...' : item.name}
        </Text>
      </Pressable>
    );
  };

  const _ABOBA = ({item}) => {
    return (
      <View style={{marginRight: 10}}>
        <View
          style={{
            height: 290,
            width: 225,
            borderRadius: 20,
            backgroundColor: '#272727',
          }}>
          <Image
            source={item.image}
            style={{
              height: 290,
              width: 225,
              borderRadius: 20,
              opacity: 0.5,
            }}
          />
        </View>
        <Pressable
          style={{
            margin: 15,
            backgroundColor: '#FFA011',
            borderRadius: 20,
            position: 'absolute',
            height: 32,
            width: 101,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: 'white',
              fontFamily: 'Mont-Bold',
              lineHeight: 17.89,
            }}>
            {item.category}
          </Text>
        </Pressable>

        <Text
          style={{
            position: 'absolute',
            textAlign: 'left',
            marginTop: 197,
            color: 'white',
            fontSize: 20,
            fontFamily: 'Mont-Bold',
            lineHeight: 25.56,
            margin: 15,
          }}>
          {item.name}
        </Text>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <MyIcon
          name={'search-1'}
          size={18}
          color={'#9C9C9C'}
          style={{zIndex: 1, left: normalize(20), fontWeight: '700'}}
        />
        <TextInput
          placeholderTextColor={'#9C9C9C'}
          placeholder="Введите название рецепта"
          style={styles.searchBar}
          value={sItem}
          onChangeText={text => setSItem(text)}
        />
      </View>
      <View style={{marginTop: 20}}>
        {sItem === false ||
        sItem === null ||
        sItem === undefined ||
        sItem === '' ? null : (
          <FlatList data={products} renderItem={_renderItem} />
        )}
        <Text
          style={{
            fontWeight: '700',
            fontFamily: 'Mont-Bold',
            fontSize: 24,
            lineHeight: 30.67,
          }}>
          Категории по продуктам
        </Text>
        <FlatList
          data={ingr}
          renderItem={_renderSlider}
          horizontal={true}
          style={{marginTop: 10}}
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <View style={{marginTop: 20}}>
        <Text
          style={{
            fontWeight: '700',
            fontFamily: 'Mont-Bold',
            fontSize: 24,
            lineHeight: 30.67,
          }}>
          Подборки
        </Text>
        <FlatList
          style={{marginTop: 10}}
          data={INFO}
          renderItem={_ABOBA}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  searchBar: {
    backgroundColor: '#F8F8F8',
    height: normalize(52),
    borderRadius: 22,
    width: '100%',
    paddingLeft: normalize(50),
    right: normalize(20),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 50,
  },
});

export default Search;
