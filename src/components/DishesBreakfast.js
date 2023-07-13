// import React from 'react';
// import {
//   StyleSheet,
//   FlatList,
//   Text,
//   View,
//   Image,
//   Pressable,
//   AsyncStorage,
// } from 'react-native';
// import normalize from 'react-native-normalize';
// import SvgUri from 'react-native-svg-uri';
// import {useNavigation} from '@react-navigation/native';
// import {recipesRequest} from '../api/recipes';
// import {baseStorageUrl} from '../api/base';
//
// class App extends React.Component {
//   constructor(props) {
//     super(props);
//     const {navigation} = this.props;
//     this.state = {
//       activated: [],
//       recipes: [],
//     };
//   }
//
//   async componentDidMount() {
//     const token = await AsyncStorage.getItem('@keepfood:token');
//     const r = await recipesRequest({
//       page: 1,
//       token,
//       meals: 1,
//     });
//     this.setState({recipes: r.list.slice(0, 9)});
//   }
//
//   _renderItem = ({item}) => (
//     <View
//       style={{
//         flex: 1,
//         marginHorizontal: 7,
//         marginBottom: 30,
//       }}>
//       <Pressable
//         onPress={() =>
//           this.state.activated.includes(item.id)
//             ? this.setState({
//                 activated: this.state.activated.filter(
//                   item_id => item_id !== item.id,
//                 ),
//               })
//             : this.setState({
//                 activated: [...this.state.activated, item.id],
//               })
//         }>
//         <View
//           style={{
//             backgroundColor: '#000000',
//             width: 107,
//             height: 107,
//             borderRadius: 20,
//           }}>
//           <View
//             style={{
//               position: 'relative',
//               justifyContent: 'center',
//               alignItems: 'center',
//               flex: 1,
//             }}>
//             <SvgUri
//               source={require('../../assets/images/misc/tick.svg')}
//               width={30}
//               height={30}
//               style={{top: 40}}
//             />
//           </View>
//           <Image
//             style={{
//               width: 107,
//               height: 107,
//               borderRadius: 20,
//               opacity: this.state.activated.includes(item.id) ? 0.4 : 1,
//             }}
//             source={{uri: baseStorageUrl + item.icon}}
//           />
//         </View>
//         <Text
//           style={{
//             textAlign: 'center',
//             marginTop: 8,
//             fontWeight: 'bold',
//             fontSize: 14,
//           }}>
//           {item.name.slice(0, 15) + '...'}
//         </Text>
//       </Pressable>
//     </View>
//   );
//
//   render() {
//     const {navigation} = this.props;
//     const {setDishesBreakfast} = this.props;
//     return (
//       <View style={{flex: 1, backgroundColor: 'white'}}>
//         <View style={{margin: normalize(20)}}>
//           <View
//             style={{
//               justifyContent: 'space-between',
//               //alignItems: 'center',
//               flexDirection: 'row',
//               //position: 'relative',
//               marginTop: normalize(65),
//               //width: '100%',
//             }}>
//             <Pressable
//               style={styles.HeaderMenuF}
//               onPress={() => navigation.navigate('Slider')}
//             />
//             <Pressable
//               style={styles.HeaderMenuF}
//               onPress={() => navigation.navigate('Skills')}
//             />
//             <Pressable
//               style={styles.HeaderMenuF}
//               onPress={() => navigation.goBack()}
//             />
//             <Pressable style={styles.HeaderMenuF} />
//             <Pressable style={styles.HeaderMenu} />
//             <Pressable style={styles.HeaderMenu} />
//             <Pressable style={styles.HeaderMenu} />
//             <Pressable style={styles.HeaderMenu} />
//           </View>
//           <Text
//             style={{
//               fontFamily: 'Mont-Bold',
//               fontSize: 24,
//               lineHeight: 30.67,
//               color: '#272727',
//               fontWeight: '700',
//               marginTop: normalize(42),
//             }}>
//             Что бы вы выбрали на завтрак?
//           </Text>
//           <FlatList
//             data={this.state.recipes}
//             renderItem={this._renderItem}
//             keyExtractor={item => item.id}
//             numColumns={3}
//             scrollEnabled={false}
//             style={{position: 'relative'}}
//             contentContainerStyle={{paddingVertical: 100}}
//           />
//           <Pressable
//             style={{
//               borderRadius: 50,
//               backgroundColor: '#FFA011',
//               //top: normalize(-15),
//               height: normalize(54),
//               width: '100%',
//               position: 'relative',
//               justifyContent: 'center',
//               textAlign: 'center',
//               alignContent: 'center',
//               alignItems: 'center',
//             }}
//             onPress={() => {
//               setDishesBreakfast(this.state.activated);
//               navigation.navigate('DishesLunch');
//             }}>
//             <Text
//               style={{
//                 fontWeight: 'bold',
//                 fontSize: 14,
//                 color: 'white',
//                 fontFamily: 'Mont-Regular',
//                 width: '90%',
//                 justifyContent: 'center',
//                 textAlign: 'center',
//                 alignContent: 'center',
//                 alignItems: 'center',
//               }}>
//               Далее
//             </Text>
//           </Pressable>
//         </View>
//       </View>
//     );
//   }
// }
//
// export default function (props) {
//   const navigation = useNavigation();
//   return <App {...props} navigation={navigation} />;
// }
//
// const styles = StyleSheet.create({
//   HeaderMenuF: {
//     borderRadius: 5,
//     width: normalize(40),
//     height: normalize(8),
//     backgroundColor: '#FFA011',
//     //marginLeft: normalize(5),
//   },
//   HeaderMenu: {
//     borderRadius: 5,
//     width: normalize(40),
//     height: normalize(8),
//     backgroundColor: '#F8F8F8',
//     //marginLeft: normalize(5),
//   },
// });
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
import SvgUri from 'react-native-svg-uri';
import {useNavigation} from '@react-navigation/native';
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
    const r = await categoriesRequest(1);
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
    const {setDishesBreakfast} = this.props;
    const handleOnCheck = () => {
      this.state.activated.length !== 0 ? cont() : this.setState({check: true});
    };
    const cont = () => {
      setDishesBreakfast(this.state.activated);
      console.log('!!!', this.state.activated);
      navigation.navigate('DishesLunch');
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
          <Pressable style={styles.HeaderMenuF} />
          <Pressable style={styles.HeaderMenuF} />
          <Pressable style={styles.HeaderMenu} />
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
          Что бы вы выбрали на завтрак?
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
