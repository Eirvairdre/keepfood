import React from 'react';
import {
  StyleSheet,
  FlatList,
  Text,
  View,
  Image,
  Pressable,
  AsyncStorage,
} from 'react-native';
import normalize from 'react-native-normalize';
import {useNavigation} from '@react-navigation/native';
import SvgUri from 'react-native-svg-uri';
import {recipesRequest} from '../api/recipes';
import {baseStorageUrl} from '../api/base';
import {categoriesRequest} from '../api/categories';

class App extends React.Component {
  constructor(props) {
    super(props);
    const {navigation} = this.props;
    this.state = {
      activated: [],
      recipes: [],
    };
  }

  async componentDidMount() {
    const r = await categoriesRequest(3);
    this.setState({recipes: r.list.slice(0, 9)});
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
          this.state.activated.includes(item.title)
            ? this.setState({
                activated: this.state.activated.filter(
                  item_name => item_name !== item.title,
                ),
              })
            : this.setState({
                activated: [...this.state.activated, item.title],
              });
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
              opacity: this.state.activated.includes(item.title) ? 0.4 : 1,
            }}
            source={{uri: baseStorageUrl + item.icon}}
          />
        </View>
        <Text
          style={{
            textAlign: 'left',
            marginTop: 8,
            fontWeight: 'bold',
            fontSize: 14,
          }}>
          {item.title}
        </Text>
      </Pressable>
    </View>
  );

  render() {
    const {navigation} = this.props;
    const {setDishesDinner} = this.props;
    const handleOnCheck = () => {
      this.state.activated.length !== 0 ? cont() : this.setState({check: true});
    };
    const cont = () => {
      setDishesDinner(this.state.activated);
      console.log('!', this.state.activated);
      navigation.navigate('DishesSnack');
    };
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
          <Pressable style={styles.HeaderMenuF} />
          <Pressable style={styles.HeaderMenu} />
          <Pressable style={styles.HeaderMenu} />
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
          Что бы вы выбрали на ужин?
        </Text>
        <Text style={{color: 'red'}}>
          {this.state.check ? 'Выберите минимум 1 блюдо' : ''}
        </Text>
        <FlatList
          data={this.state.recipes}
          renderItem={this._renderItem}
          keyExtractor={item => item.id}
          numColumns={3}
          scrollEnabled={false}
          style={{position: 'relative', top: normalize(2)}}
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
            handleOnCheck();
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
