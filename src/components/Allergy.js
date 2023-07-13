import React from 'react';
import {
  StyleSheet,
  FlatList,
  Text,
  View,
  Image,
  Pressable,
  TextInput,
  AsyncStorage,
} from 'react-native';
import normalize from 'react-native-normalize';
import {useNavigation} from '@react-navigation/native';
import SvgUri from 'react-native-svg-uri';
import {baseStorageUrl} from '../api/base';
import {productsRequest} from '../api/products';
import {allergiesAdd, mealsInit, profileInit} from '../api/profile';
import {GetRecipes} from '../api/recommends';

class App extends React.Component {
  constructor(props) {
    super(props);
    const {navigation} = this.props;
    this.state = {
      activated: [],
      allergies: [],
      name: '',
    };
  }

  componentDidMount() {
    this._updateRecipes().then(_ => _);
  }

  async _updateRecipes() {
    const r = await productsRequest({name: this.state.name});
    this.setState({allergies: r.list.slice(0, 6)});
  }
  _renderItem = ({item}) => (
    <View
      style={{
        flex: 1,
        marginHorizontal: 7,
        marginBottom: 30,
      }}>
      <Pressable
        onPress={() => {
          this.state.activated.includes(item.id)
            ? this.setState({
                activated: [
                  ...this.state.activated.filter(
                    item_id => item_id !== item.id,
                  ),
                ],
              })
            : this.setState({
                activated: [...this.state.activated, item.id],
              });
          console.log(this.state.activated);
        }}>
        <View
          style={{
            backgroundColor: '#000000',
            width: 107,
            height: 107,
            borderRadius: 20,
          }}>
          <View
            style={{
              position: 'relative',
              justifyContent: 'center',
              alignItems: 'center',
              flex: 1,
            }}>
            <SvgUri
              source={require('../../assets/images/misc/tick.svg')}
              width={30}
              height={30}
              style={{top: 40}}
            />
          </View>
          <Image
            style={{
              width: 107,
              height: 107,
              borderRadius: 20,
              opacity: this.state.activated.includes(item.id) ? 0.4 : 1,
            }}
            source={{uri: baseStorageUrl + item.icon}}
          />
        </View>
        <Text
          style={{
            textAlign: 'center',
            marginTop: 8,
            fontWeight: 'bold',
            fontSize: 14,
          }}>
          {item.name.length <= 6 ? item.name : item.name.slice(0, 9) + '...'}
        </Text>
      </Pressable>
    </View>
  );

  render() {
    // console.log(baseStorageUrl + '3879ce46-70e8-11ed-a1eb-0242ac120002');
    const handleOnPress = async () => {
      const dishes = [
        ...this.props.dishesBreakfast,
        ...this.props.dishesLunch,
        ...this.props.dishesDinner,
        ...this.props.dishesSnack,
      ];
      console.log(
        '><',
        dishes,
        this.state.activated,
        this.props.budget_min,
        this.props.budget_max,
        this.props.skills,
        this.props.times,
      );
      console.log(this.state.activated);
      const token = await AsyncStorage.getItem('@keepfood:token');
      try {
        await allergiesAdd(token, this.state.activated);
        await profileInit(
          token,
          this.props.budget_min,
          this.props.budget_max,
          this.props.skills,
        );
        await mealsInit(token, this.props.times);
        await GetRecipes(token, dishes);
        navigation.navigate('MainPage');
      } catch (err) {
        console.log(err);
      }
    };
    const budget_min = this.props;
    const budget_max = this.props;
    const skills = this.props;
    const times = this.props;
    const dishesBreakfast = this.props;
    const dishesLunch = this.props;
    const dishesDinner = this.props;
    const dishesSnack = this.props;
    // const {callback} = this.props;
    const {navigation} = this.props;
    // const {setAllergies} = this.props;
    const {} = this.props;
    return (
      <View style={{flex: 1, padding: 20, backgroundColor: '#FFFFFF'}}>
        <View
          style={{
            justifyContent: 'center',
            flexDirection: 'row',
            position: 'relative',
            top: normalize(40),
            width: '100%',
          }}>
          <Pressable
            style={styles.HeaderMenuF}
            onPress={() => navigation.navigate('Slider')}
          />
          <Pressable
            style={styles.HeaderMenuF}
            onPress={() => navigation.navigate('Skills')}
          />
          <Pressable
            style={styles.HeaderMenuF}
            onPress={() => navigation.navigate('Times')}
          />
          <Pressable
            style={styles.HeaderMenuF}
            onPress={() => navigation.navigate('DishesBreakfast')}
          />
          <Pressable
            style={styles.HeaderMenuF}
            onPress={() => navigation.navigate('DishesLunch')}
          />
          <Pressable
            style={styles.HeaderMenuF}
            onPress={() => navigation.navigate('DishesDinner')}
          />
          <Pressable
            style={styles.HeaderMenuF}
            onPress={() => navigation.goBack()}
          />
          <Pressable style={styles.HeaderMenuF} />
        </View>
        <Text
          style={{
            fontFamily: 'Mont-Bold',
            fontSize: 24,
            lineHeight: 31,
            color: '#272727',
            width: '100%',
            position: 'relative',
            top: normalize(87),
          }}>
          На какие продукты у вас есть аллергия
        </Text>
        <TextInput
          placeholder="Введите название продукта"
          placeholderTextColor={'#9C9C9C'}
          onChangeText={text => {
            this.setState({name: text});
            this._updateRecipes().then(r => {});
          }}
          style={{
            zIndex: 1,
            width: '100%',
            position: 'relative',
            top: normalize(128),
            height: 54,
            backgroundColor: '#F8F8F8',
            borderRadius: 15,
            paddingLeft: 20,
            alignItems: 'center',
          }}
        />
        <FlatList
          data={this.state.allergies}
          renderItem={this._renderItem}
          keyExtractor={item => item.id}
          numColumns={3}
          scrollEnabled={false}
          style={{position: 'relative', top: normalize(86)}}
          contentContainerStyle={{paddingVertical: 100}}
        />
        <Pressable
          style={{
            borderRadius: 50,
            backgroundColor: '#FFA011',
            top: normalize(-15),
            height: normalize(54),
            width: '100%',
            position: 'relative',
            justifyContent: 'center',
            textAlign: 'center',
            alignContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => {
            handleOnPress();
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
            Завершить
          </Text>
        </Pressable>
      </View>
    );
  }
}

export default function (props) {
  const navigation = useNavigation();
  return <App {...props} navigation={navigation} />;
}

const styles = StyleSheet.create({
  HeaderMenuF: {
    borderRadius: 5,
    width: normalize(40),
    height: normalize(8),
    backgroundColor: '#FFA011',
    marginLeft: normalize(5),
  },
  HeaderMenu: {
    borderRadius: 5,
    width: normalize(40),
    height: normalize(8),
    backgroundColor: '#F8F8F8',
    marginLeft: normalize(5),
  },
});
