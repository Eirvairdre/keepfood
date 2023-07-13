import {
  StyleSheet,
  Text,
  Alert,
  Pressable,
  View,
  Image,
  AsyncStorage,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import normalize from 'react-native-normalize';

export default function Reg({navigation}) {
  const [token, setToken] = useState(false);
  useEffect(() => {
    checker();
  });

  const checker = async () => {
    try {
      const r = await AsyncStorage.getItem('@keepfood:token');
      r === undefined || r === false || r === null
        ? null
        : navigation.navigate('MainPage');
    } catch {}
  };

  return (
    <View style={{flex: 1}}>
      <Image
        source={require('../../assets/images/background.png')}
        style={{flex: 1, height: '100%', width: '100%', position: 'absolute'}}
      />
      <View style={{marginTop: normalize(413), margin: 20}}>
        <View style={{marginVertical: 22}}>
          <Text
            style={{
              fontFamily: 'Mont-Bold',
              fontSize: 32,
              lineHeight: 40.9,
              color: 'white',
              fontWeight: '700',
            }}>
            Добро пожаловать
          </Text>
          <Text>
            <Text
              style={{
                fontFamily: 'Mont-Bold',
                fontSize: 32,
                lineHeight: 40.9,
                color: 'white',
                fontWeight: '700',
              }}>
              в
            </Text>
            {'  '}
            <Text
              style={{
                fontFamily: 'Mont-Bold',
                fontSize: 32,
                lineHeight: 40.9,
                color: '#FFA011',
                fontWeight: '700',
              }}>
              keepfoód
            </Text>
          </Text>
        </View>
        <Text
          style={{
            fontFamily: 'Mont-Regular',
            fontSize: 14,
            lineHeight: 21,
            color: '#9C9C9C',
            fontWeight: '600',
          }}>
          Получайте каждый день уникальный рецепт, готовьте, наслаждайтесь.
        </Text>
        <View style={{marginTop: 22}}>
          <Pressable
            onPress={() => {
              navigation.navigate('SignIn');
            }}
            style={{
              width: '100%',
              backgroundColor: '#FFA011',
              height: normalize(52),
              borderRadius: 16,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                color: 'white',
                fontFamily: 'Mont-Regular',
                lineHeight: 21,
                fontWeight: '600',
              }}>
              Войти через Email
            </Text>
          </Pressable>
          <Pressable
            onPress={() => Alert.alert('Not available')}
            style={{
              width: '100%',
              marginTop: 15,
              backgroundColor: '#FFFFFF',
              height: normalize(52),
              borderRadius: 16,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                color: '#272727',
                fontFamily: 'Mont-Regular',
                lineHeight: 21,
                fontWeight: '600',
              }}>
              Продолжить через Google
            </Text>
          </Pressable>
        </View>
      </View>
      <Pressable
        style={{
          flex: 1,
          marginTop: 12,
          alignItems: 'center',
          alignContent: 'center',
        }}
        onPress={() => {
          navigation.navigate('Reg1');
        }}>
        <View style={{alignItems: 'center', flexDirection: 'row'}}>
          <Text
            style={{
              //fontWeight: '700',
              fontSize: 14,
              fontFamily: 'Mont-Regular',
              color: '#9C9C9C',
            }}>
            Нет аккаунта?{' '}
          </Text>
          <Text
            style={{
              //fontWeight: '700',
              fontSize: 14,
              fontFamily: 'Mont-Regular',
              color: '#FFA011',
            }}>
            Зарегистрируйтесь!
          </Text>
        </View>
      </Pressable>
    </View>
  );
}
