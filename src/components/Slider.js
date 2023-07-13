import normalize from 'react-native-normalize';
import {Dimensions, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import {useNavigation} from '@react-navigation/native';
import CustomMarker from '../../assets/CustomMarker';

export default function App({setBudget}) {
  const [sliderOneChanging, setSliderOneChanging] = React.useState(false);
  const [sliderOneValue, setSliderOneValue] = React.useState([5]);
  const [multiSliderValue, setMultiSliderValue] = React.useState([500, 1500]);
  const [nonCollidingMultiSliderValue, setNonCollidingMultiSliderValue] =
    React.useState([0, 100]);

  const sliderOneValuesChangeStart = () => setSliderOneChanging(true);

  const sliderOneValuesChange = values => setSliderOneValue(values);

  const multiSliderValuesChange = values => setMultiSliderValue(values);

  const navigation = useNavigation();

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View style={styles.container}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: normalize(85),
          }}>
          <Pressable style={styles.HeaderMenuF} />
          <Pressable style={styles.HeaderMenu} />
          <Pressable style={styles.HeaderMenu} />
          <Pressable style={styles.HeaderMenu} />
          <Pressable style={styles.HeaderMenu} />
          <Pressable style={styles.HeaderMenu} />
          <Pressable style={styles.HeaderMenu} />
          <Pressable style={styles.HeaderMenu} />
        </View>
        <Text style={styles.Header}>
          Укажите ваши финансовые возможности на приготовление одного блюда
        </Text>
        <View
          style={{
            flexDirection: 'row',
            marginTop: normalize(78),
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              fontSize: 20,
              fontFamily: 'Mont-Regular',
              fontWeight: '600',
              lineHeight: 25.56,
            }}>
            Стоимость блюда:
          </Text>
          <Text
            style={{
              fontSize: 20,
              color: '#FAA011',
              fontFamily: 'Mont-regular',
              fontWeight: '500',
              lineHeight: 20.45,
            }}>
            {' '}
            {multiSliderValue[0]}₽ - {multiSliderValue[1]}₽
          </Text>
        </View>
        <View
          style={{
            marginTop: normalize(30),
            flex: 1,
            //justifyContent: 'center',
            alignItems: 'center',
            marginLeft: normalize(20),
            marginRight: normalize(20),
          }}>
          <MultiSlider
            selectedStyle={{
              backgroundColor: '#FFA011',
            }}
            unselectedStyle={{
              backgroundColor: '#F8F8F8',
            }}
            //values={[5]}
            containerStyle={{
              height: 40,
            }}
            trackStyle={{
              height: 6,
              backgroundColor: 'red',
            }}
            touchDimensions={{
              height: 80,
              width: 80,
              borderRadius: 8,
              slipDisplacement: 40,
            }}
            values={[multiSliderValue[0], multiSliderValue[1]]}
            isMarkersSeparated={true}
            customMarkerLeft={e => {
              return <CustomMarker currentValue={e.currentValue} />;
            }}
            customMarkerRight={e => {
              return <CustomMarker currentValue={e.currentValue} />;
            }}
            sliderLength={Dimensions.get('window').width - 40}
            markerSize={40}
            onValuesChange={multiSliderValuesChange}
            min={100}
            max={2000}
            step={50}
            allowOverlap
            snapped
            //customLabel={CustomLabel}
          />
        </View>
        <Pressable
          style={styles.end}
          onPress={() => {
            setBudget(multiSliderValue);
            navigation.navigate('Skills');
          }}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 14,
              color: 'white',
              fontFamily: 'Mont-Regular',
              //width: '90%',
              justifyContent: 'center',
              textAlign: 'center',
              alignContent: 'center',
              alignItems: 'center',
            }}>
            Далее
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 20,
    marginRight: 20,
  },
  end: {
    backgroundColor: '#FFA011',
    borderRadius: 100,
    width: '100%',
    position: 'relative',
    height: normalize(54),
    //right: normalize(20),
    //left: normalize(20),
    marginTop: normalize(337),
    justifyContent: 'center',
    textAlign: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  HeaderMenuF: {
    borderRadius: 5,
    width: normalize(40),
    height: normalize(8),
    backgroundColor: '#FFA011',
    //marginLeft: normalize(5),
  },
  HeaderMenu: {
    borderRadius: 5,
    width: normalize(40),
    height: normalize(8),
    backgroundColor: '#F8F8F8',
    //marginLeft: normalize(5),
  },
  slider: {
    //top: normalize(393),
  },
  Header: {
    marginTop: normalize(42),
    fontWeight: '700',
    fontSize: 24,
    fontFamily: 'Mont-Bold',
    lineHeight: 30.67,
  },
  text: {
    //marginLeft: 20,
    //fontWeight:'700',
    fontSize: 20,
    fontFamily: 'Mont-Regular',
    marginRight: 20,
    //paddingVertical: 20,
    //top: normalize(252),
  },
  sliderOne: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});
