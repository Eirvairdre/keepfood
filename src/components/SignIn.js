import {
  StyleSheet,
  Text,
  View,
  Image,
  Keyboard,
  TextInput,
  Dimensions,
  Pressable,
  TouchableWithoutFeedback,
  AsyncStorage,
  Alert,
} from 'react-native';
// import {AsyncStorage} from '@react-native-async-storage/async-storage';
import * as React from 'react';
import {useState, useRef} from 'react';
import {emailExistRequest, signInRequest, signUpRequest} from '../api/auth';
import Input from './Input';

export default function Reg1({navigation}) {
  const [isFocused, setIsFocused] = useState(false);
  const ref_input2 = useRef();
  const [password, setPassword] = useState('');
  const [fail, setFail] = useState(false);
  const [isExist, setIsExist] = useState(false);
  const [errors, setErrors] = useState({});
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });
  const validation = async () => {
    let valid = true;
    Keyboard.dismiss();
    if (!inputs.email) {
      handleError('пожалуйста, введите свой email', 'email');
      valid = false;
    } else if (!inputs.email.match(/[a-zA-z0-9._-]+@[a-z]+\.[a-z]+/)) {
      handleError('пожалуйста, введите корректный email', 'email');
      valid = false;
    }

    if (!inputs.password) {
      handleError('пожалуйста, введите свой пароль', 'password');
      valid = false;
    } else if (fail) {
      handleError('неверный логин или пароль', 'password');
    }

    if (valid) {
      register();
    }
  };
  const register = async () => {
    try {
      const r = await signInRequest(inputs.password, inputs.email);
      try {
        await AsyncStorage.setItem('@keepfood:token', r.token);
        console.log(r.token);
      } catch (err) {
        console.error(err);
      }
      navigation.navigate('MainPage');
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

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/43.png')}
        style={styles.background}
      />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View
          style={[styles.register, isFocused && {marginTop: 110}]}
          onBlur={() => setIsFocused(false)}
          onFocus={() => setIsFocused(true)}>
          <View
            style={{
              flex: 1,
              position: 'relative',
              alignItems: 'center',
              //justifyContent: 'center',
              width: Dimensions.get('window').width,
              marginTop: 40,
              height: 41,
            }}>
            <Text
              style={{
                color: '#272727',
                textAlign: 'center',
                fontFamily: 'Mont-Bold',
                //top: 0,
                fontSize: 32,
                fontWeight: 'bold',
              }}>
              Войти
            </Text>
          </View>
          <View style={styles.regform}>
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

            {/*{fail && (*/}
            {/*  <Text style={{color: 'red', marginLeft: 20}}>*/}
            {/*    Неверный логин или пароль*/}
            {/*  </Text>*/}
            {/*)}*/}
            <Pressable
              style={styles.end}
              onPress={async () => {
                // try {
                // validate();
                //   const r = await signInRequest(password, email);
                // navigation.navigate('MainPage');
                //   try {
                //     await AsyncStorage.setItem('@keepfood:token', r.token);
                //   } catch (err) {
                //     console.log(err);
                //   }
                // } catch {
                //   setFail(true);
                validation();
              }}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 14,
                  color: 'white',
                  fontFamily: 'Mont-Regular',
                  width: '90%',
                  justifyContent: 'center',
                  textAlign: 'center',
                  alignContent: 'center',
                  alignItems: 'center',
                }}>
                Далее
              </Text>
            </Pressable>
            <View style={{height: 18}}>
              <Pressable
                style={{
                  position: 'relative',
                  marginTop: 22,
                  height: 18,
                  width: Dimensions.get('window').width - 40,
                }}
                onPress={() => {
                  navigation.navigate('Reg1');
                }}>
                <Text style={{textAlign: 'center'}}>
                  <Text
                    style={{
                      fontWeight: '700',
                      fontSize: 14,
                      fontFamily: 'Mont-Regular',
                      height: 18,
                      color: '#9C9C9C',
                    }}>
                    Нет аккаунта?{' '}
                  </Text>
                  <Text
                    style={{
                      fontWeight: '700',
                      fontSize: 14,
                      fontFamily: 'Mont-Regular',
                      height: 18,
                      color: '#FFA011',
                    }}>
                    Зарегистрируйтесь!
                  </Text>
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //ustifyContent: 'center',
    position: 'relative',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: '#FFFFFF',
  },
  background: {
    flex: 1,
    //justifyContent: 'center',
    position: 'absolute',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height / 1.8,
    //top: 0,
  },
  register: {
    position: 'relative',
    //width: 390,
    height: 370,
    //left: 0,
    marginTop: 400,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  regform: {
    width: Dimensions.get('window').width - 40,
    marginLeft: 20,
    marginRight: 20,
  },
  cilckable: {
    backgroundColor: '#F8F8F8',
    position: 'relative',
    //justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    //top: 107,
    //right: 20,
    //left: 20,
    fontFamily: 'Mont-Regular',
    marginBottom: 15,
    height: 54,
    paddingLeft: 20,
  },
  end: {
    backgroundColor: '#FFA011',
    //right: 20,
    //left: 20,
    //top: 108,
    borderRadius: 50,
    height: 54,
    width: '100%',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    alignContent: 'center',
  },
});
