import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Dimensions,
  Pressable,
  Keyboard,
  TouchableWithoutFeedback,
  AsyncStorage,
} from 'react-native';
import * as React from 'react';
//import AsyncStorage from '@react-native-async-storage/async-storage';
import {useState, useRef} from 'react';
import Input from './Input';
import normalize from 'react-native-normalize';
import {signInRequest, signUpRequest} from '../api/auth';

export default function Reg1({navigation}) {
  const [inputs, setInputs] = useState({
    email: '',
    name: '',
    password: '',
    re_password: '',
  });
  const [errors, setErrors] = useState({});
  const validation = () => {
    let valid = true;
    Keyboard.dismiss();
    if (!inputs.email) {
      handleError('пожалуйста, введите свой email', 'email');
      valid = false;
    } else if (
      !inputs.email.match(/[a-zA-Z0-9._]+@[a-zA-Z]+\.[a-z]+/)
    ) {
      handleError('пожалуйста, введите корректный email', 'email');
      valid = false;
    } else if (!inputs.email.match(/^[A-Za-z0-9@.]+$/)) {
      handleError('email должен содержать только латиницу и цифры', 'email');
      valid = false;
    }
    if (!inputs.name) {
      handleError('пожалуйста, введите свое имя', 'name');
      valid = false;
    }

    if (!inputs.password) {
      handleError('пожалуйста, введите свой пароль', 'password');
      valid = false;
    }

    if (inputs.password !== inputs.re_password) {
      handleError('пароли не совпадают', 're_password');
      valid = false;
    } else if (inputs.password.length < 5) {
      handleError('пароль должен содержать более 5 символов', 'password');
      valid = false;
    } else if (!inputs.password.match(/^[A-Za-z0-9]+$/)) {
      handleError(
        'пароль должен содержать только латиницу и цифры',
        'password',
      );
      valid = false;
    }
    if (valid) {
      register();
    }
  };
  const register = async () => {
    try {
      await signUpRequest(inputs.email, inputs.name, inputs.password);
      await AsyncStorage.setItem('@keepfood:name', inputs.name);
      const r = await signInRequest(inputs.password, inputs.email);
      try {
        await AsyncStorage.setItem('@keepfood:token', r.token);
        console.log(r.token);
      } catch (err) {
        console.error(err);
      }
      navigation.navigate('Slider');
    } catch (err) {
      console.error(err);
      setFail(true);
    }
  };

  const handleOnChange = (text, input) => {
    setInputs(prevState => ({...prevState, [input]: text}));
  };
  const handleError = (errorMessage, input) => {
    setErrors(prevState => ({...prevState, [input]: errorMessage}));
  };

  const [fail, setFail] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <Image
          source={require('../../assets/images/43.png')}
          style={{
            flex: 1,
            position: 'absolute',
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height / 2,
            marginTop: 0,
          }}
        />
        <View
          style={[styles.register, isFocused && {marginTop: '25%'}]}
          onBlur={() => setIsFocused(false)}
          onFocus={() => setIsFocused(true)}>
          <Text
            style={{
              color: '#272727',
              textAlign: 'center',
              marginTop: normalize(20),
              fontFamily: 'Mont-Bold',
              fontSize: 32,
              fontWeight: 'bold',
            }}>
            Регистрация
          </Text>
          <View style={styles.regform}>
            <Input
              label={'Введите имя'}
              onChangeText={name => handleOnChange(name, 'name')}
              error={errors.name}
              onFocus={() => {
                handleError(null, 'name');
              }}
            />
            <Input
              label={'Email'}
              onFocus={() => {
                handleError(null, 'email');
              }}
              error={errors.email}
              onChangeText={email => handleOnChange(email, 'email')}
            />
            <Input
              label={'Введите пароль'}
              password
              error={errors.password}
              onFocus={() => {
                handleError(null, 'password');
              }}
              onChangeText={text => handleOnChange(text, 'password')}
            />
            <Input
              label={'Подтвердите пароль'}
              password
              onFocus={() => {
                handleError(null, 're_password');
              }}
              error={errors.re_password}
              onChangeText={text => handleOnChange(text, 're_password')}
            />
            <Pressable
              style={styles.end}
              onPress={() => {
                validation();
                // try {
                //   await signUpRequest(email, name, password);
                //   await AsyncStorage.setItem('@keepfood:name', name);
                //   const r = await signInRequest(password, email);
                //   try {
                //     await AsyncStorage.setItem('@keepfood:token', r.token);
                //     console.log(r.token);
                //   } catch (err) {
                //     console.error(err);
                //   }
                //  navigation.navigate('Slider');
                // } catch (err) {
                //   console.error(err);
                //   setFail(true);
                // }
              }}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 14,
                  color: 'white',
                  fontFamily: 'Mont-Regular',
                  justifyContent: 'center',
                  textAlign: 'center',
                  alignContent: 'center',
                  alignItems: 'center',
                }}>
                Далее
              </Text>
            </Pressable>
            {/*{fail && (*/}
            {/*  <Text style={{color: 'red'}}>*/}
            {/*    Пользователь с такие email уже существует*/}
            {/*  </Text>*/}
            {/*)}*/}
            <Pressable
              style={{
                position: 'relative',
                alignItems: 'center',
                height: normalize(54),
                marginTop: 22,
              }}
              onPress={() => {
                navigation.navigate('SignIn');
              }}>
              <Text style={{textAlign: 'center'}}>
                <Text
                  style={{
                    fontWeight: '700',
                    fontFamily: 'Mont-Regular',
                    fontSize: 14,
                    height: 18,
                    color: '#9C9C9C',
                  }}>
                  Есть аккаунт?{' '}
                </Text>
                <Text
                  style={{
                    fontWeight: '700',
                    fontSize: 14,
                    fontFamily: 'Mont-Regular',
                    height: 18,
                    color: '#FFA011',
                  }}>
                  Авторизируйтесь!
                </Text>
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#FFFFFF',
  },
  register: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    alignContent: 'center',
    marginTop: '88%',
    paddingRight: 20,
    paddingLeft: 20,
    position: 'relative',
    alignItems: 'center',
    height: Dimensions.get('window').height / 2,
  },
  regform: {
    marginTop: 26,
    width: Dimensions.get('window').width - 40,
  },
  clickable: {
    backgroundColor: '#F8F8F8',
    position: 'relative',
    fontFamily: 'Mont-Regular',
    alignItems: 'center',
    borderRadius: 100,
    marginBottom: 15,
    height: 54,
    paddingLeft: 20,
  },
  end: {
    backgroundColor: '#FFA011',
    borderRadius: 100,
    alignItems: 'center',
    height: normalize(54),
    width: '100%',
    position: 'relative',
    textAlign: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
});
