import * as React from 'react';
import {
  Text,
  View,
  TextInput,
  FlatList,
  Pressable,
  Dimensions,
} from 'react-native';
import MyIcon from '../../assets/fonts/icon-font';
import normalize from 'react-native-normalize';
import {useEffect, useState} from 'react';
import {productsRequest} from '../api/products';
import SvgUri from 'react-native-svg-uri';

function Calendars() {
  const [sItem, setSItem] = useState(false);
  const [products, setProducts] = useState([]);
  const [prodList, setProdList] = useState([]);

  useEffect(() => {
    reqProducts();
  }, [sItem, reqProducts]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const reqProducts = async () => {
    const r = await productsRequest({
      name: sItem,
      page: 1,
    });
    try {
      setProducts(r.list);
      //let prod = products.map(({name}) => name);
    } catch (err) {
      console.error(err);
    }
  };
  const _renderitem = ({item}) => {
    return (
      <View
        style={{
          backgroundColor: '#F8F8F8',
          flex: 1,
          borderRadius: 22,
          marginTop: 10,
        }}>
        <Pressable
          onPress={() => {
            setProdList(current => [...current, item.id]);
            setSItem('');
          }}
          style={{
            height: 54,
            justifyContent: 'center',
            paddingLeft: 20,
            //flex: 1,
            //zIndex: 2,
            width: Dimensions.get('window').width - 40,
            paddingRight: 10,
          }}>
          <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
            <Text
              style={{
                fontFamily: 'Mont-regular',
                lineHeight: 21,
                fontSize: 14,
              }}>
              {item.name}
            </Text>
            <SvgUri
              width={26}
              height={26}
              source={require('../../assets/images/misc/ic_plus.svg')}
              //style={{justifyContent: 'center'}}
            />
          </View>
        </Pressable>
      </View>
    );
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}>
      <Text
        style={{
          fontSize: 24,
          fontFamily: 'Mont-Bold',
          textAlign: 'left',
          marginTop: 80,
          marginLeft: 20,
          marginRight: 20,
        }}>
        Мой холодильник
      </Text>
      <View
        style={{
          alignItems: 'center',
          marginLeft: 20,
          marginRight: 20,
          marginTop: 20,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <MyIcon
            name="search-1"
            size={24}
            color="#9C9C9C"
            style={{left: normalize(40), zIndex: 1}}
          />
          <TextInput
            placeholder="Введите название продукта"
            placeholderTextColor="#9C9C9C"
            value={sItem}
            onChangeText={text => setSItem(text)}
            style={{
              borderRadius: 22,
              width: '100%',
              height: 54,
              paddingLeft: 47,
              marginRight: 22,
              backgroundColor: '#F8F8F8',
            }}
          />
        </View>
        {sItem === false || sItem === '' || sItem === undefined ? (
          prodList === [] ? (
            <Text
              style={{
                marginTop: 162,
                fontSize: 14,
                lineHeight: 21,
                textAlign: 'center',
                fontFamily: 'Mont-Regular',
              }}>
              Это ваш холодильник, выберите продукты которые у вас есть чтобы
              рекомендации блюд были максимально удобными и точными для вас
            </Text>
          ) : (
            <Text style={{marginTop: 20}}>{prodList}</Text>
          )
        ) : (
          <View>
            <FlatList
              data={products}
              renderItem={_renderitem}
              scrollEnabled={true}
              style={{}}
            />
          </View>
        )}
      </View>
    </View>
  );
}

export default Calendars;
