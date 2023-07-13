import React, {useEffect, useState} from 'react';
import styles from '../../assets/styles';
import {
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  Pressable,
  AsyncStorage,
} from 'react-native';
import SvgUri from 'react-native-svg-uri';
import LinearGradient from 'react-native-linear-gradient';
import {baseStorageUrl} from '../api/base';
import MyIcon from '../../assets/fonts/icon-font';
import normalize from 'react-native-normalize';
import {likeSet} from '../api/recommends';
import {getRecipe, bookmark} from '../api/recipes';

const CardItem = ({
  actions,
  desc,
  onPressLeft,
  onPressRight,
  onPressFromLeft,
  navigation,
  title,
  time,
  icon,
  id,
  caloric,
  proteins,
  fats,
  carbo,
}) => {
  const fullWidth = Dimensions.get('window').width - 40;
  const fullHeight = Dimensions.get('window').height - normalize(350);
  const [token, setToken] = useState();
  const [marked, setMarked] = useState(false);

  const imageStyle = [
    {
      flex: 1,
      borderRadius: 20,
      width: fullWidth,
      height: fullHeight,
      position: 'absolute',
    },
  ];

  useEffect(() => {
    AsyncStorage.getItem('@keepfood:token').then(r => setToken(r));
  });

  useEffect(() => {
    checking();
  }, [checking, id]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const checking = async () => {
    await getRecipe(id, token).then(r => setMarked(r.bookmarked));
  };
  console.log(marked);
  return (
    <View style={styles.containerCardItem}>
      <Pressable onPress={() => navigation.navigate('Dish', {recipe_id: id})}>
        <LinearGradient
          colors={['#272727', 'rgba(0, 0, 0, 0)']}
          style={{
            height: fullHeight,
            width: fullWidth,
            borderRadius: 20,
            position: 'absolute',
            zIndex: 1,
          }}
          start={{x: 0, y: 1}}
          end={{x: 0, y: 0}}
        />
        <Image source={{uri: baseStorageUrl + icon}} style={imageStyle} />
        <View
          style={{
            zIndex: 1,
            flex: 1,
            width: fullWidth,
            height: fullHeight,
            // position: 'absolute',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: fullWidth - 30,
              margin: 15,
            }}>
            <Pressable
              style={{
                width: 99,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 15,
                height: 44,
                backgroundColor: 'rgba(255, 255, 255, 0.3)',
              }}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 14,
                  fontFamily: 'Mont-Regular',
                  lineHeight: 17.89,
                }}>
                {time} мин
              </Text>
            </Pressable>
            <Pressable
              onPress={() => {
                // handleOnPress();
              }}
              style={{
                width: 44,
                height: 44,
                borderRadius: 15,
                backgroundColor: 'rgba(255, 255, 255, 0)',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              {/*<MyIcon name="frame-5019" size={18} />*/}
            </Pressable>
          </View>
          <View
            style={{
              width: fullWidth - 20,
              marginLeft: 10,
              marginRight: 10,
              position: 'absolute',
              bottom: 15,
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: 28,
                fontFamily: 'Mont-Bold',
                lineHeight: 35.78,
                marginTop: normalize(175),
                textAlign: 'center',
                zIndex: 1,
              }}>
              {title.length >= 17 ? title.slice(0, 17) + '...' : title}
            </Text>
            <Text
              style={{
                color: 'white',
                fontSize: 12,
                fontFamily: 'Mont-Bold',
                lineHeight: 19.2,
                textAlign: 'center',
                zIndex: 1,
                marginTop: normalize(15),
              }}>
              {desc.length >= 90 ? desc.slice(0, 83) + '...' : desc}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                position: 'relative',
                marginTop: normalize(15),
              }}>
              <View style={{flexDirection: 'column', alignItems: 'center'}}>
                <Text style={styles.firTitle}>Калорийность</Text>
                <Text style={styles.nums}>{caloric}</Text>
                <Text style={styles.secTitle}>ккал</Text>
              </View>
              <View style={{flexDirection: 'column', alignItems: 'center'}}>
                <Text style={styles.firTitle}>Белки</Text>
                <Text style={styles.nums}>{proteins}</Text>
                <Text style={styles.secTitle}>грамм</Text>
              </View>
              <View style={{flexDirection: 'column', alignItems: 'center'}}>
                <Text style={styles.firTitle}>Жиры</Text>
                <Text style={styles.nums}>{fats}</Text>
                <Text style={styles.secTitle}>грамм</Text>
              </View>
              <View style={{flexDirection: 'column', alignItems: 'center'}}>
                <Text style={styles.firTitle}>Углеводы</Text>
                <Text style={styles.nums}>{carbo}</Text>
                <Text style={styles.secTitle}>грамм</Text>
              </View>
            </View>
            {actions && (
              <View style={styles.actionsCardItem}>
                <TouchableOpacity
                  style={styles.miniButtonBack}
                  onPress={() => this.swiper.goBackFromTop()}>
                  <SvgUri
                    width={24}
                    height={24}
                    source={require('../../assets/images/misc/return.svg')}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.buttonDislike}
                  onPress={async () => {
                    console.log(id);
                    await likeSet(token, id, false);
                    onPressLeft();
                  }}>
                  <SvgUri // подключить лайки и дислайки и поменять ссылку
                    width={28}
                    height={28}
                    source={require('../../assets/images/misc/dislike.svg')}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.buttonLike}
                  onPress={async () => {
                    console.log(id);
                    await likeSet(token, id, true);
                    onPressRight();
                  }}>
                  <SvgUri
                    width={28}
                    height={28}
                    source={require('../../assets/images/misc/like.svg')}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.miniButtonMark,
                    marked && {borderColor: '#FFA011'},
                  ]}
                  onPress={async () => {
                    console.log(id);
                    marked === true ? setMarked(false) : setMarked(true);
                    marked === false || null
                      ? await bookmark(token, id, true)
                      : await bookmark(token, id, false);
                  }}>
                  <SvgUri
                    width={24}
                    height={24}
                    source={
                      marked === false || null
                        ? require('../../assets/images/misc/mark.svg')
                        : require('../../assets/images/misc/selMark.svg')
                    }
                  />
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </Pressable>
    </View>
  );
};

export default CardItem;
