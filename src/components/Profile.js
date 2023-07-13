import * as React from 'react';
import {Text, View, Pressable, Image, AsyncStorage} from 'react-native';
import MyIcon from '../../assets/fonts/icon-font';
import LinearGradient from 'react-native-linear-gradient';
import SvgUri from 'react-native-svg-uri';
import Lottie from 'lottie-react-native';
import {useEffect, useState} from 'react';
import {getUser} from '../api/user';

function Profile({navigation}) {
  const [token, setToken] = useState(false);
  const [username, setUsername] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('@keepfood:token').then(r => setToken(r));
  });

  useEffect(() => {
    userInfo();
  }, [token, userInfo]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const userInfo = async () => {
    const r = await getUser(token);
    try {
      setUsername(r.name);
      console.log(r.name);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{margin: 20, top: 50}}>
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            position: 'relative',
          }}>
          <Pressable
            // onPress={() => {
            //   navigation.navigate('Edit');
            // }}
            style={{
              height: 52,
              width: 52,
              backgroundColor: '#F8F8F8',
              borderRadius: 15,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <MyIcon name="ci_edit" color={'#FFA011'} size={18} />
          </Pressable>
          <Pressable
            style={{justifyContent: 'center'}}
            onPress={() => {
              AsyncStorage.removeItem('@keepfood:token');
              navigation.navigate('Reg');
            }}>
            <Text
              style={{
                color: '#FF5A5A',
                fontFamily: 'Mont-Regular',
                fontSize: 16,
                lineHeight: 20.45,
              }}>
              Выйти
            </Text>
          </Pressable>
        </View>
        <View style={{alignItems: 'center', top: 14, position: 'relative'}}>
          <Image
            source={require('../../assets/images/igor.jpg')}
            style={{borderRadius: 20, height: 104, width: 104}}
          />
          <Text
            style={{
              fontFamily: 'Mont-Bold',
              fontSize: 22,
              lineHeight: 28.12,
              top: 15,
            }}>
            {username}
          </Text>
        </View>
        {/*<View style={{position: 'relative', top: 46}}>*/}
        {/*  <LinearGradient*/}
        {/*    colors={['#FFA011', '#EDBD75']}*/}
        {/*    style={{borderRadius: 30}}*/}
        {/*    start={{x: 0, y: 1}}*/}
        {/*    end={{x: 1, y: 1}}>*/}
        {/*    <Pressable style={{height: 172, width: '100%', padding: 20}}>*/}
        {/*      <View style={{height: 31, width: 191, flexDirection: 'row'}}>*/}
        {/*        <Text*/}
        {/*          style={{*/}
        {/*            fontFamily: 'Mont-Bold',*/}
        {/*            fontSize: 24,*/}
        {/*            lineHeight: 30.67,*/}
        {/*            color: '#FFFFFF',*/}
        {/*          }}>*/}
        {/*          keepfoód*/}
        {/*        </Text>*/}
        {/*        <Text> </Text>*/}
        {/*        <Pressable*/}
        {/*          style={{*/}
        {/*            borderRadius: 10,*/}
        {/*            backgroundColor: '#FFFFFF',*/}
        {/*            height: 26,*/}
        {/*            width: 68,*/}
        {/*            alignItems: 'center',*/}
        {/*            justifyContent: 'center',*/}
        {/*            top: 4,*/}
        {/*          }}>*/}
        {/*          <Text*/}
        {/*            style={{*/}
        {/*              color: 'orange',*/}
        {/*              fontFamily: 'Mont-Bold',*/}
        {/*              fontSize: 16,*/}
        {/*              lineHeight: 20.45,*/}
        {/*            }}>*/}
        {/*            family*/}
        {/*          </Text>*/}
        {/*        </Pressable>*/}
        {/*      </View>*/}
        {/*      <Text*/}
        {/*        style={{*/}
        {/*          fontFamily: 'Mont-Bold',*/}
        {/*          color: '#FFFFFF',*/}
        {/*          fontSize: 14,*/}
        {/*          lineHeight: 21,*/}
        {/*          top: 10,*/}
        {/*        }}>*/}
        {/*        Испытайте все преимущества сервиса с подпиской Keepfoód family*/}
        {/*      </Text>*/}
        {/*      <View*/}
        {/*        style={{flexDirection: 'row', top: 33, alignItems: 'flex-end'}}>*/}
        {/*        <Text*/}
        {/*          style={{*/}
        {/*            fontFamily: 'Mont-Bold',*/}
        {/*            fontSize: 24,*/}
        {/*            color: '#FFFFFF',*/}
        {/*            lineHeight: 30.67,*/}
        {/*          }}>*/}
        {/*          149,00₽*/}
        {/*        </Text>*/}
        {/*        <Text> </Text>*/}
        {/*        <Text*/}
        {/*          style={{*/}
        {/*            fontFamily: 'Mont-Regular',*/}
        {/*            fontSize: 14,*/}
        {/*            color: '#FFFFFF',*/}
        {/*            lineHeight: 21,*/}
        {/*          }}>*/}
        {/*          /мес*/}
        {/*        </Text>*/}
        {/*      </View>*/}
        {/*    </Pressable>*/}
        {/*  </LinearGradient>*/}
        {/*</View>*/}
        <View style={{flexDirection: 'column', top: 46, marginVertical: 15}}>
          {/*<Pressable style={{flexDirection: 'row', alignItems: 'center'}}>*/}
          {/*  <Pressable*/}
          {/*    style={{*/}
          {/*      height: 54,*/}
          {/*      width: 54,*/}
          {/*      backgroundColor: '#F8F8F8',*/}
          {/*      borderRadius: 15,*/}
          {/*      alignItems: 'center',*/}
          {/*      justifyContent: 'center',*/}
          {/*      marginRight: 17,*/}
          {/*    }}>*/}
          {/*    <SvgUri*/}
          {/*      width={24}*/}
          {/*      height={24}*/}
          {/*      source={require('../../assets/images/misc/Setting.svg')}*/}
          {/*    />*/}
          {/*  </Pressable>*/}
          {/*  <Text*/}
          {/*    style={{*/}
          {/*      fontFamily: 'Mont-Bold',*/}
          {/*      fontSize: 16,*/}
          {/*      lineHeight: 20.45,*/}
          {/*    }}>*/}
          {/*    Настройки*/}
          {/*  </Text>*/}
          {/*</Pressable>*/}
          {/*<Pressable*/}
          {/*  style={{*/}
          {/*    flexDirection: 'row',*/}
          {/*    alignItems: 'center',*/}
          {/*    marginVertical: 15,*/}
          {/*  }}>*/}
          {/*  <Pressable*/}
          {/*    style={{*/}
          {/*      height: 54,*/}
          {/*      width: 54,*/}
          {/*      backgroundColor: '#F8F8F8',*/}
          {/*      borderRadius: 15,*/}
          {/*      alignItems: 'center',*/}
          {/*      justifyContent: 'center',*/}
          {/*      marginRight: 17,*/}
          {/*    }}>*/}
          {/*    <SvgUri*/}
          {/*      width={24}*/}
          {/*      height={24}*/}
          {/*      source={require('../../assets/images/misc/Alisa.svg')}*/}
          {/*    />*/}
          {/*  </Pressable>*/}
          {/*  <Text*/}
          {/*    style={{*/}
          {/*      fontFamily: 'Mont-Bold',*/}
          {/*      fontSize: 16,*/}
          {/*      lineHeight: 20.45,*/}
          {/*    }}>*/}
          {/*    Яндекс.Алиса*/}
          {/*  </Text>*/}
          {/*</Pressable>*/}
          <Pressable
            style={{flexDirection: 'row', alignItems: 'center', marginTop: 15}}
            onPress={() => {
              navigation.navigate('Booked');
            }}>
            <Pressable
              style={{
                height: 54,
                width: 54,
                backgroundColor: '#F8F8F8',
                borderRadius: 15,
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 17,
              }}>
              <SvgUri
                width={29}
                height={29}
                source={require('../../assets/images/misc/selMark.svg')}
              />
            </Pressable>
            <Text
              style={{
                fontFamily: 'Mont-Bold',
                fontSize: 16,
                lineHeight: 20.45,
              }}>
              Избранное
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

export default Profile;
