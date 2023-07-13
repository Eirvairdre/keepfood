import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Pressable,
  Alert,
} from 'react-native';
import normalize from 'react-native-normalize';
import {useNavigation} from '@react-navigation/native';

const SelectScreen = ({setTimes}) => {
  const Data = [
    {
      id: 1,
      time: 'Завтрак',
      selcted: false,
    },
    {
      id: 2,
      time: 'Обед',
      selcted: false,
    },
    {
      id: 3,
      time: 'Ужин',
      selcted: false,
    },
    {
      id: 4,
      time: 'Перекус',
      selcted: false,
    },
  ];

  const [select, setSelect] = useState(Data);
  const [curtime, setCurtime] = useState([]);
  const navigation = useNavigation();
  const handleOnPress = item => {
    const newItem = select.map(val => {
      if (val.id === item.id) {
        return {...val, selcted: !val.selcted};
      } else {
        return val;
      }
    });
    setSelect(newItem);
  };
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{margin: normalize(20)}}>
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            flex: 1,
            marginTop: normalize(65),
            //alignItems: 'center',
          }}>
          <Pressable
            style={styles.HeaderMenuF}
            onPress={() => navigation.navigate('Slider')}
          />
          <Pressable
            style={styles.HeaderMenuF}
            onPress={() => navigation.navigate('Skills')}
          />
          <Pressable style={styles.HeaderMenuF} />
          <Pressable style={styles.HeaderMenu} />
          <Pressable style={styles.HeaderMenu} />
          <Pressable style={styles.HeaderMenu} />
          <Pressable style={styles.HeaderMenu} />
          <Pressable style={styles.HeaderMenu} />
        </View>
        <Text
          style={{
            fontSize: 24,
            lineHeight: 30.67,
            fontWeight: '700',
            fontFamily: 'Mont-Bold',
            color: '#272727',
            marginTop: normalize(42),
          }}>
          Укажите ваши приёмы пищи
        </Text>
        <FlatList
          style={{marginTop: 30}}
          scrollEnabled={false}
          data={select}
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  handleOnPress(item);
                  !item.selcted === true
                    ? setCurtime(current => [...current, item.id])
                    : setCurtime(current => [
                        ...current.filter(p => p !== item.id),
                      ]);
                }}>
                <View
                  style={{
                    marginBottom: 20,
                    backgroundColor: item.selcted ? '#FAA011' : '#F8F8F8',
                    padding: 20,
                    borderRadius: 22,
                    height: normalize(60),
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: 12,
                      fontFamily: 'Mont-Regular',
                      color: item.selcted ? 'white' : 'black',
                    }}>
                    {item.time}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
        <Pressable
          style={{
            height: normalize(54),
            width: '100%',
            backgroundColor: '#FFA011',
            borderRadius: 100,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: normalize(190),
          }}
          onPress={() => {
            setTimes(curtime);
            curtime.sort();
            curtime.indexOf(1) === 0
              ? navigation.navigate('DishesBreakfast')
              : curtime.indexOf(2) === 0
              ? navigation.navigate('DishesLunch')
              : curtime.indexOf(3) === 0
              ? navigation.navigate('DishesDinner')
              : curtime.indexOf(4) === 0
              ? navigation.navigate('DishesSnack')
              : Alert.alert('Пожалуйста, выберете хотя бы один прием пищи');
          }}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 14,
              color: 'white',
              fontFamily: 'Mont-Regular',
            }}>
            Далее
          </Text>
        </Pressable>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
    //alignItems: 'center',
  },
  HeaderMenuF: {
    borderRadius: 5,
    width: normalize(40),
    height: normalize(8),
    backgroundColor: '#FFA011',
  },
  HeaderMenu: {
    borderRadius: 5,
    width: normalize(40),
    height: normalize(8),
    backgroundColor: '#F8F8F8',
  },
});
export default SelectScreen;
