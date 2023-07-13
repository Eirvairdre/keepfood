import React, {useState} from 'react';
import {View, Text, Pressable} from 'react-native';

export default function CustomSwitch({
  selectionMode,
  option1,
  option2,
  option3,
  option4,
  onSelectSwitch,
}) {
  const [getSelectionMode, setSelectionMode] = useState(selectionMode);
  const updateSwitchData = value => {
    setSelectionMode(value);
    onSelectSwitch(value);
  };

  return (
    <View
      style={{
        width: 350,
        height: 31,
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        justifyContent: 'space-between',
      }}>
      <Pressable activeOpacity={1} onPress={() => updateSwitchData(1)}>
        <Text
          style={{
            color: getSelectionMode === 1 ? '#FAA011' : '#C8C8C8',
            fontFamily: 'Mont-Bold',
            fontSize: 22,
          }}>
          {option1}
        </Text>
      </Pressable>
      <Pressable activeOpacity={1} onPress={() => updateSwitchData(2)}>
        <Text
          style={{
            color: getSelectionMode === 2 ? '#FAA011' : '#C8C8C8',
            fontFamily: 'Mont-Bold',
            fontSize: 22,
          }}>
          {option2}
        </Text>
      </Pressable>
      <Pressable activeOpacity={1} onPress={() => updateSwitchData(3)}>
        <Text
          style={{
            color: getSelectionMode === 3 ? '#FAA011' : '#C8C8C8',
            fontFamily: 'Mont-Bold',
            fontSize: 22,
          }}>
          {option3}
        </Text>
      </Pressable>
      <Pressable activeOpacity={1} onPress={() => updateSwitchData(4)}>
        <Text
          style={{
            color: getSelectionMode === 4 ? '#FAA011' : '#C8C8C8',
            fontFamily: 'Mont-Bold',
            fontSize: 22,
          }}>
          {option4}
        </Text>
      </Pressable>
    </View>
  );
}
