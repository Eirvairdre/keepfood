import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import MIcon from '../../assets/fonts/password/icon-font';

const Input = ({label, error, password, onFocus = () => {}, ...props}) => {
  const [isFocused, setIsFocused] = React.useState(false);
  const [hidePassword, setHidePassword] = React.useState(password);
  return (
    <View style={{marginBottom: 15}}>
      <View
        style={[
          styles.inputContainer,
          {borderColor: error ? 'red' : isFocused ? '#F8F8F8' : '#F8F8F8'},
        ]}>
        <TextInput
          style={{color: '#272727', flex: 1, height: 54}}
          {...props}
          autoCapitalize="none"
          secureTextEntry={hidePassword}
          autoCorrect={false}
          placeholder={label}
          placeholderTextColor="#9C9C9C"
          onFocus={() => {
            onFocus();
            setIsFocused(true);
          }}
          onBlur={() => {
            setIsFocused(false);
          }}
        />
        {password && (
          <MIcon
            name={hidePassword ? 'eye-off' : 'eye'}
            style={{fontSize: 18, marginRight: 20, color: '#9C9C9C'}}
            onPress={() => {
              setHidePassword(!hidePassword);
            }}
          />
        )}
      </View>
      {error && (
        <Text
          style={{
            color: 'red',
            fontSize: 12,
            fontFamily: 'Mont-Regular',
            top: 3,
          }}>
          {error}
        </Text>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  label: {
    marginVertical: 5,
    fontSize: 14,
    color: '#9C9C9C',
  },
  inputContainer: {
    height: 54,
    backgroundColor: '#F8F8F8',
    borderRadius: 30,
    fontFamily: 'Mont-Regular',
    paddingLeft: 20,
    borderWidth: 0.5,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default Input;
