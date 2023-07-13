import * as React from 'react';
import {
  View,
  Pressable,
  Text,
  Dimensions,
  SafeAreaView,
  Image,
  StyleSheet,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  AsyncStorage,
} from 'react-native';
import SvgUri from 'react-native-svg-uri';
import {useNavigation, useRoute} from '@react-navigation/native';
// import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
// import Geolocation from '@react-native-community/geolocation';
// import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import Geocoder from '@timwangdev/react-native-geocoder';
import {sendOrder} from '../api/order';

class OrderMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      position: {
        latitude: 55.7513111,
        longitude: 37.618205,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      },
      isFocused: false,
      isTyping: false,
      address: [
        {
          adminArea: '',
          country: '',
          countryCode: '',
          feature: null,
          formattedAddress: '',
        },
      ],
      add: false,
      apartNum: false,
      number: false,
    };
    this.products_id = props.route.params.id;
    this.recipe_id = props.route.params.recipe_id;
    this.token = props.route.params.token;
    this.shop_id = props.route.params.shop_id;
  }

  componentDidMount() {
    console.log(this.props.route.params.id);
    console.log('!', this.props.route.params.shop_id);
    // Geolocation.getCurrentPosition(pos => {
    //   const crd = pos.coords;
    //   this.setState({
    //     position: {
    //       latitude: crd.latitude,
    //       longitude: crd.longitude,
    //       latitudeDelta: 0.01,
    //       longitudeDelta: 0.01,
    //     },
    //   });
    //   Geocoder.geocodePosition(
    //     {
    //       lat: crd.latitude,
    //       lng: crd.longitude,
    //     },
    //     {
    //       locale: 'ru',
    //       maxResults: 1,
    //       apiKey: 'AIzaSyC5lQIJJXyXjqhTHb-P8bpLgaFMD_zyQMs',
    //       fallbackToGoogle: true,
    //     },
    //   ).then(r => this.setState({address: r}));
    //   console.log(this.state.address[0].formattedAddress);
    // });
  }
  onRegionChange = position => {
    this.setState({
      position,
    });
  };

  handleSubmit = async () => {
    let posAdd = this.state.add + ' ' + this.state.apartNum;
    console.log(posAdd);
    await sendOrder({
      token: this.token,
      recipe_ids: [this.recipe_id],
      market_id: this.shop_id,
      phone: this.state.number,
      address: posAdd,
      exclude_products: this.products_id,
    }).then(r => console.log(r));
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.position !== prevState.position) {
      Geocoder.geocodePosition(
        {
          lat: this.state.position.latitude,
          lng: this.state.position.longitude,
        },
        {
          locale: 'ru',
          maxResults: 1,
          apiKey: 'AIzaSyC5lQIJJXyXjqhTHb-P8bpLgaFMD_zyQMs',
          fallbackToGoogle: true,
        },
      ).then(r => this.setState({address: r}));
      console.log(this.state.address[0].formattedAddress);
    }
  }

  render() {
    const {navigation} = this.props;
    // const {position} = this.state;
    const {isFocused} = this.state;
    // const {isTyping} = this.state;
    return (
      <TouchableWithoutFeedback
        onPress={Keyboard.dismiss}
        accessible={false}
        style={{backgroundColor: 'white'}}>
        <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
          <View
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              width: Dimensions.get('window').width - 40,
              zIndex: 3,
              marginLeft: 20,
              marginRight: 20,
            }}>
            <Pressable
              style={{
                width: 48,
                height: 48,
                backgroundColor: '#F8F8F8',
                borderRadius: 15,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => navigation.goBack()}>
              <SvgUri source={require('../../assets/images/misc/back.svg')} />
            </Pressable>
            <Text
              style={{fontFamily: 'Mont-Bold', fontSize: 20, marginLeft: 10}}>
              Выберите адрес доставки
            </Text>
          </View>
          {/*<MapView*/}
          {/*  style={styles.map}*/}
          {/*  initialRegion={position}*/}
          {/*  // showsUserLocation={true}*/}
          {/*  showsMyLocationButton={true}*/}
          {/*  // followsUserLocation={true}*/}
          {/*  onRegionChangeComplete={this.onRegionChange}*/}
          {/*  // showsScale={true}*/}
          {/*  // scrollEnabled={true}*/}
          {/*  // zoomEnabled={true}*/}
          {/*  // provider={PROVIDER_GOOGLE}*/}
          {/*/>*/}
          {/*<View*/}
          {/*  style={{*/}
          {/*    left: '50%',*/}
          {/*    marginLeft: -15,*/}
          {/*    position: 'absolute',*/}
          {/*    top: '50%',*/}
          {/*    zIndex: 3,*/}
          {/*  }}>*/}
          {/*  <Image*/}
          {/*    style={{height: 40, width: 30}}*/}
          {/*    source={require('../../assets/images/Vector.png')}*/}
          {/*  />*/}
          {/*</View>*/}
          {/*/!*<Marker*!/*/}
          {/*/!*  // draggable={true}*!/*/}
          {/*/!*  // image={require('../../assets/images/Vector.png')}*!/*/}
          {/*/!*  // onDragStart={e => {*!/*/}
          {/*/!*  //   console.log('DragStart', e.nativeEvent.coordinates);*!/*/}
          {/*/!*  // }}*!/*/}
          {/*/!*  // onDragEnd={e => {*!/*/}
          {/*/!*  //   this.setState({*!/*/}
          {/*/!*  //     position: {*!/*/}
          {/*/!*  //       latitude: e.nativeEvent.coordinate.latitude,*!/*/}
          {/*/!*  //       longitude: e.nativeEvent.coordinate.longitude,*!/*/}
          {/*/!*  //     },*!/*/}
          {/*/!*  //   });*!/*/}
          {/*//   coordinate={{*/}
          {/*//     latitude: position.latitude,*/}
          {/*//     longitude: position.longitude,*/}
          {/*//   }}*/}
          {/*// />*/}
          {/*<View*/}
          {/*  style={[styles.mainContainer, isTyping && {height: 488}]}*/}
          {/*  onBlur={() => this.setState({isTyping: false})}*/}
          {/*  onFocus={() => this.setState({isTyping: true})}>*/}
          {/*  /!*<Text>*!/*/}
          {/*  /!*  {this.state.address*!/*/}
          {/*  /!*    ? JSON.stringify(this.state.address.position.formattedAddress)*!/*/}
          {/*  /!*    : 'Loading'}*!/*/}
          {/*  /!*  }*!/*/}
          {/*  /!*</Text>*!/*/}
          {/*  <View*/}
          {/*    style={[styles.container, isFocused && {height: 90}]}*/}
          {/*    onBlur={() => this.setState({isFocused: false})}*/}
          {/*    onFocus={() => this.setState({isFocused: true})}>*/}
          {/*    <GooglePlacesAutocomplete*/}
          {/*      placeholder="Адрес"*/}
          {/*      autofocus={false}*/}
          {/*      placeholderTextColor="#9C9C9C"*/}
          {/*      minLength={2}*/}
          {/*      onPress={(data, details = null) => {*/}
          {/*        //console.log(data, details);*/}
          {/*        this.setState({*/}
          {/*          position: {*/}
          {/*            latitude: details.geometry.location.lat,*/}
          {/*            longitude: details.geometry.location.lng,*/}
          {/*            latitudeDelta: 0.01,*/}
          {/*            longitudeDelta: 0.01,*/}
          {/*          },*/}
          {/*        });*/}
          {/*        Geocoder.geocodePosition(*/}
          {/*          {*/}
          {/*            lat: details.geometry.location.lat,*/}
          {/*            lng: details.geometry.location.lng,*/}
          {/*          },*/}
          {/*          {*/}
          {/*            locale: 'ru',*/}
          {/*            maxResults: 1,*/}
          {/*            apiKey: 'AIzaSyC5lQIJJXyXjqhTHb-P8bpLgaFMD_zyQMs',*/}
          {/*            fallbackToGoogle: true,*/}
          {/*          },*/}
          {/*        ).then(r => this.setState({address: r}));*/}
          {/*        console.log(this.state.address[0].formattedAddress);*/}
          {/*      }}*/}
          {/*      GooglePlacesSearchQuery={{*/}
          {/*        rankby: 'range',*/}
          {/*      }}*/}
          {/*      query={{*/}
          {/*        key: 'AIzaSyC5lQIJJXyXjqhTHb-P8bpLgaFMD_zyQMs',*/}
          {/*        language: 'ru',*/}
          {/*        components: 'country:ru',*/}
          {/*      }}*/}
          {/*      fetchDetails={true}*/}
          {/*      styles={{*/}
          {/*        textInput: {*/}
          {/*          height: 52,*/}
          {/*          color: '#9C9C9C',*/}
          {/*          fontSize: 14,*/}
          {/*          borderRadius: 22,*/}
          {/*          backgroundColor: '#F8F8F8',*/}
          {/*          fontFamily: 'Mont-Regular',*/}
          {/*        },*/}
          {/*        container: {*/}
          {/*          marginRight: 20,*/}
          {/*          marginLeft: 20,*/}
          {/*          // marginTop: '150%',*/}
          {/*        },*/}
          {/*      }}*/}
          {/*    />*/}
          {/*  </View>*/}
          {/*  <TextInput*/}
          {/*    placeholder={'Номер квартиры'}*/}
          {/*    placeholderTextColor="#9C9C9C"*/}
          {/*    style={{*/}
          {/*      backgroundColor: '#F8F8F8',*/}
          {/*      borderRadius: 22,*/}
          {/*      marginLeft: 20,*/}
          {/*      marginRight: 20,*/}
          {/*      height: 52,*/}
          {/*      paddingLeft: 10,*/}
          {/*      color: '#9C9C9C',*/}
          {/*      fontFamily: 'Mont-Regular',*/}
          {/*      fontSize: 14,*/}
          {/*      alignItems: 'center',*/}
          {/*      zIndex: 3,*/}
          {/*      marginBottom: 50,*/}
          {/*    }}*/}
          {/*  />*/}
          <View
            style={[styles.cont, isFocused && {bottom: 400}]}
            onBlur={() => this.setState({isFocused: false})}
            onFocus={() => this.setState({isFocused: true})}>
            <TextInput
              placeholder={'Адрес'}
              placeholderTextColor={'#9C9C9C'}
              style={{
                height: 52,
                width: Dimensions.get('screen').width - 40,
                backgroundColor: '#F8F8F8',
                borderRadius: 22,
                marginBottom: 20,
                paddingLeft: 20,
              }}
              onChangeText={text => this.setState({add: text})}
            />
            <TextInput
              placeholder={'№ квартиры'}
              placeholderTextColor={'#9C9C9C'}
              style={{
                height: 52,
                width: Dimensions.get('screen').width - 40,
                backgroundColor: '#F8F8F8',
                borderRadius: 22,
                marginBottom: 20,
                paddingLeft: 20,
              }}
              onChangeText={text => this.setState({apartNum: text})}
            />
            <TextInput
              placeholder={'Номер телефона с +7'}
              placeholderTextColor={'#9C9C9C'}
              style={{
                height: 52,
                width: Dimensions.get('screen').width - 40,
                backgroundColor: '#F8F8F8',
                borderRadius: 22,
                marginBottom: 20,
                paddingLeft: 20,
              }}
              onChangeText={text => this.setState({number: text})}
            />
            <Pressable
              style={{
                backgroundColor: '#FFA011',
                height: 52,
                borderRadius: 16,
                justifyContent: 'center',
                alignItems: 'center',
                width: Dimensions.get('screen').width - 40,
              }}
              onPress={() => {
                this.handleSubmit();
                navigation.navigate('OrderFinal');
              }}>
              <Text
                style={{
                  color: '#FFFFFF',
                  fontSize: 14,
                  fontFamily: 'Mont-Regular',
                  lineHeight: 21,
                }}>
                Продолжить
              </Text>
            </Pressable>
          </View>
          {/*</View>*/}
        </SafeAreaView>
      </TouchableWithoutFeedback>
    );
  }
}

export default function (props) {
  const navigation = useNavigation();
  const route = useRoute();
  return <OrderMap {...props} navigation={navigation} route={route} />;
}

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 2,
  },
  container: {
    height: 52,
    marginBottom: 20,
    marginTop: 30,
  },
  cont: {
    bottom: Dimensions.get('screen').height / 25,
    position: 'absolute',
    width: Dimensions.get('screen').width,
    // marginBottom: 32,
    alignItems: 'center',
  },
  mainContainer: {
    bottom: 0,
    position: 'absolute',
    width: '100%',
    zIndex: 4,
    backgroundColor: '#FFFFFF',
    borderTopRightRadius: 22,
    borderTopLeftRadius: 22,
    height: 288,
  },
});
