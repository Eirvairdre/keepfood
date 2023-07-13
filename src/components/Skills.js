import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Pressable,
  View,
} from 'react-native';
import normalize from 'react-native-normalize';
import {useNavigation} from '@react-navigation/native';

class App extends React.Component {
  constructor(props) {
    super(props);
    const navigation = this.props;
    this.state = {
      categes: [
        {
          cat_id: 1,
          backgroundcolor: '#FFA011',
          color: 'white',
          text: 'Я не очень умею готовить, смогу приготовить простые блюда',
        },
        {
          cat_id: 2,
          backgroundcolor: '#F8F8F8',
          color: 'black',
          text: 'Я уже неплохо разбираюсь на кухне, умею готовить средние рецепты, но что-то сложное - не для меня',
        },
        {
          cat_id: 3,
          backgroundcolor: '#F8F8F8',
          color: 'black',
          text: 'Я хорошо умею готовить, переодически готовлю сложные блюда',
        },
        {
          cat_id: 4,
          backgroundcolor: '#F8F8F8',
          color: 'black',
          text: 'Я - шеф-повар, умею готовить блюда любой сложности, уверенно чувствую себя на кухне',
        },
      ],
      change: false,
    };
  }

  changeBackground = item => {
    const categes = JSON.parse(JSON.stringify(this.state.categes));

    for (let x = 0; x < this.state.categes.length; x++) {
      if (this.state.categes[x].cat_id === item.cat_id) {
        categes[x].backgroundcolor = '#FFA011';
        categes[x].color = 'white';

        this.setState({
          categes: categes,
        });
        console.log(' . ', item.cat_id);
        console.log(' . ', this.state.categes[x].cat_id);
      } else {
        categes[x].backgroundcolor = '#F8F8F8';
        categes[x].color = 'black';

        // this.setState({
        //   categes: categes,
        // });
      }
    }
  };

  render() {
    const {navigation} = this.props;
    const {setSkills} = this.props;
    return (
      <View style={styles.container}>
        <View style={{margin: normalize(20)}}>
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              flex: 1,
              marginTop: normalize(65),
              width: '100%',
            }}>
            <Pressable
              style={styles.HeaderMenuF}
              onPress={() => navigation.goBack()}
            />
            <Pressable style={styles.HeaderMenuF} />
            <Pressable style={styles.HeaderMenu} />
            <Pressable style={styles.HeaderMenu} />
            <Pressable style={styles.HeaderMenu} />
            <Pressable style={styles.HeaderMenu} />
            <Pressable style={styles.HeaderMenu} />
            <Pressable style={styles.HeaderMenu} />
          </View>
          <Text
            style={{
              color: '#272727',
              fontSize: 24,
              fontWeight: '700',
              fontFamily: 'Mont-Bold',
              marginTop: normalize(42),
              lineHeight: 30.67,
              textAlign: 'center',
            }}>
            Как Вы оцениваете свои кулинарные способности?
          </Text>

          <View style={styles.raw}>
            {this.state.categes.map((item, key) => (
              <Pressable
                style={{
                  backgroundColor: item.backgroundcolor,
                  marginBottom: normalize(20),
                  width: '100%',
                  //marginTop: 30,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 20,
                }}
                onPress={() => {
                  setSkills(item.cat_id);
                  this.changeBackground(item);
                }}>
                <Text
                  style={{
                    color: item.color,
                    fontFamily: 'Mont-Regular',
                    fontSize: 14,
                    alignItems: 'center',
                    textAlign: 'center',
                    margin: normalize(15),
                    lineHeight: 21,
                  }}>
                  {item.text}
                </Text>
              </Pressable>
            ))}

            <Pressable
              style={{
                backgroundColor: '#FFA011',
                borderRadius: 100,
                width: '100%',
                position: 'relative',
                alignItems: 'center',
                height: normalize(54),
                textAlign: 'center',
                justifyContent: 'center',
                alignContent: 'center',
                marginTop: normalize(100),
              }}
              onPress={() => {
                //setSkills(this.state.categes.id);
                navigation.navigate('Times');
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
      </View>
    );
  }
}

export default function (props) {
  const navigation = useNavigation();
  return <App {...props} navigation={navigation} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    //padding: 20,
    //alignItems: 'center',
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
  textStyle: {
    //position: "absolute",
    //justifyContent: 'center',
    //alignItems: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
  },
  raw: {
    marginTop: 30,
    //justifyContent: 'center',
    alignItems: 'center',
  },
});
