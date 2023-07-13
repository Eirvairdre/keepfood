import React from 'react';
import {SafeAreaView, View, Pressable, Text, Dimensions} from 'react-native';

function OrderFinal({navigation}) {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{marginLeft: 20, marginRight: 20}}>
        <View
          style={{
            // alignItems: 'center',
            justifyContent: 'center',
            marginTop: 309,
          }}>
          <Text
            style={{
              color: '#FFA011',
              fontFamily: 'Mont-Bold',
              fontSize: 20,
              fontWeight: '700',
              lineHeight: 26,
              textAlign: 'left',
              marginBottom: 10,
            }}>
            Благодарим за ваш заказ
          </Text>
          <Text
            style={{
              color: '#272727',
              fontFamily: 'Mont-Bold',
              fontSize: 20,
              fontWeight: '700',
              lineHeight: 26,
              height: 78,
              marginBottom: Dimensions.get('screen').height / 2.92,
            }}>
            В течение некоторого времени с вами свяжется оператор для уточнения
            заказа и его оплаты
          </Text>
        </View>
        <Pressable
          onPress={() => {
            navigation.navigate('MainPage');
          }}
          style={{
            backgroundColor: '#FFA011',
            height: 52,
            borderRadius: 16,
            justifyContent: 'center',
            alignItems: 'center',
            width: Dimensions.get('screen').width - 40,
          }}>
          <Text
            style={{
              fontSize: 14,
              fontFamily: 'Mont-Regular',
              color: 'white',
            }}>
            Завершить
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

export default OrderFinal;
