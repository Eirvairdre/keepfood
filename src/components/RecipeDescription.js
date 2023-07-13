import React, {Component} from 'react';
import {getRecipe} from '../api/recipes';
import {Dimensions, FlatList, Image, Pressable, Text, View} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {baseStorageUrl} from '../api/base';
import normalize from 'react-native-normalize';
import Loader from './Loader';

class RecipeDescriptionComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      steps: null,
    };
    this.recipe_id = props.route.params.recipe_id;
    this.token = props.route.params.token;
  }

  componentDidMount() {
    getRecipe(this.recipe_id, this.token).then(r =>
      this.setState({
        steps: [...r.steps, {end: true, name: r.name, image: r.icon}],
        index: false,
      }),
    );
  }

  render() {
    if (!this.state.steps) {
      return <Loader />;
    }

    return (
      <View style={{flex: 1, alignItems: 'center', backgroundColor: 'white'}}>
        <Carousel
          ref={c => {
            this._carousel = c;
          }}
          data={this.state.steps}
          renderItem={({item, index}) =>
            item.end ? (
              <View
                style={{
                  height: Dimensions.get('window'),
                  borderRadius: 30,
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    height: Dimensions.get('window'),
                    width: '100%',
                    borderRadius: 30,
                    backgroundColor: '#272727',
                  }}>
                  <Image
                    source={{uri: baseStorageUrl + item.image}}
                    style={{
                      //position: 'absolute',
                      height: 400,
                      width: '100%',
                      borderRadius: 30,
                      opacity: 0.6,
                    }}
                  />
                </View>
                <Text
                  style={{
                    position: 'absolute',
                    alignItems: 'center',
                    //marginTop: 30,
                    margin: 20,
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Mont-Bold',
                      fontSize: 24,
                      lineHeight: 31,
                      color: '#FFFFFF',
                    }}>
                    Поздравляю, вы приготовили{' '}
                  </Text>
                  <Text
                    style={{
                      color: '#FFA011',
                      fontFamily: 'Mont-Bold',
                      fontSize: 24,
                      lineHeight: 31,
                    }}>
                    {item.name}
                  </Text>
                </Text>
                <Pressable
                  onPress={() => {
                    this.props.navigation.navigate('MainPage');
                  }}
                  style={{
                    backgroundColor: '#FFA011',
                    width: '100%',
                    alignItems: 'center',
                    height: 52,
                    justifyContent: 'center',
                    borderRadius: 30,
                    top: Dimensions.get('window').height - normalize(300),
                    position: 'absolute',
                    marginLeft: 30,
                  }}>
                  <Text style={{fontFamily: 'Mont-Regular', color: 'white'}}>
                    Завершить
                  </Text>
                </Pressable>
              </View>
            ) : (
              <View
                style={{
                  backgroundColor: 'rgba(156, 156, 156, 0.2)',
                  borderRadius: 30,
                  height: Dimensions.get('window').height - 200,
                  padding: 30,
                }}>
                <Text
                  style={{
                    fontSize: 24,
                    fontFamily: 'Mont-Bold',
                    color: '#FFA011',
                  }}>
                  Шаг {index + 1}
                </Text>
                <Text
                  style={{
                    marginTop: 30,
                    fontFamily: 'Mont-Regular',
                    fontSize: 16,
                    lineHeight: 21,
                    color: '#272727',
                  }}>
                  {item.desc}
                </Text>
                <Pressable
                  onPress={() => {
                    this._carousel.snapToItem(index + 1);
                  }}
                  style={{
                    backgroundColor: '#FFA011',
                    width: '100%',
                    alignItems: 'center',
                    height: 52,
                    justifyContent: 'center',
                    borderRadius: 30,
                    top: Dimensions.get('window').height - normalize(300),
                    position: 'absolute',
                    marginLeft: 30,
                  }}>
                  <Text style={{fontFamily: 'Mont-Regular', color: 'white'}}>
                    Далее
                  </Text>
                </Pressable>
              </View>
            )
          }
          sliderWidth={Dimensions.get('window').width - 30}
          itemWidth={Dimensions.get('window').width - 30}
          onSnapToItem={index => this.setState({index: index})}
          containerCustomStyle={{
            flex: 1,
            marginTop: 100,
            borderRadius: 30,
          }}
        />
      </View>
    );
  }
}

export default RecipeDescriptionComponent;
