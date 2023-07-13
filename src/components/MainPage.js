import React, {useEffect, useState} from 'react';
import {View, AsyncStorage, SafeAreaView, Text} from 'react-native';
import CardStack, {Card} from 'react-native-card-stack-swiper';
import CardItem from './CardItem';
import styles from '../../assets/styles';
import {getRecipe, recipesRequest} from '../api/recipes';
import PreLoader from './PreLoader';

import {SelectList} from 'react-native-dropdown-select-list';

const MainPage = ({navigation}) => {
  const [token, setToken] = useState(false);
  // const [key, setKey] = useState(0);
  const [recipes, setRecipes] = useState();
  const [ro, setRo] = useState({});
  const [recipesStack, setRecipesStack] = useState();
  const [select, setSelected] = useState(1);

  const data = [
    {key: 1, value: 'завтрак'},
    {key: 2, value: 'обед'},
    {key: 3, value: 'ужин'},
    {key: 4, value: 'перекус'},
  ];

  useEffect(() => {
    if (!recipes) {
      return;
    }
    Promise.all(
      recipes.map(async (item, index) => {
        const getInfo = await getRecipe(ro.list[index].id, token);
        return (
          <Card>
            <CardItem
              desc={item.desc}
              title={item.name}
              time={item.cooking_time}
              icon={item.icon}
              id={item.id}
              actions
              bookmarked={item.bookmarked}
              caloric={getInfo.meta.caloric_content}
              proteins={getInfo.meta.proteins}
              fats={getInfo.meta.fats}
              carbo={getInfo.meta.carbohydrates}
              navigation={navigation}
              onPressFromLeft={() => {
                // likeSet({positive: false, recipe_id: item.id});
                this.swiper.goBackFromLeft();
                // console.log(item.id);
              }}
              onPressLeft={() => {
                // likeSet({positive: false, recipe_id: item.id});
                this.swiper.swipeLeft();
                // console.log(item.id);
              }}
              onPressRight={() => {
                // console.log(item.id);
                // likeSet({positive: true, recipe_id: item.id});
                this.swiper.swipeRight();
              }}
            />
          </Card>
        );
      }),
    ).then(r => setRecipesStack(r));
  }, [recipes, select]);

  useEffect(() => {
    AsyncStorage.getItem('@keepfood:token').then(r => setToken(r));
  });

  useEffect(() => {
    sliderData();
  }, [token, select, sliderData]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const sliderData = async () => {
    const r = await recipesRequest({
      token,
      meals: select,
    });
    try {
      setRo(r);
      setRecipes(r.list);
    } catch (err) {
      console.error(err);
    }
  };
  console.log('~', select);
  // const handleOnPress = () => {
  //   setLike(prevState => !prevState);
  //   console.log('?', like);
  //   pushLike();
  //   console.log(token);
  //   console.log(ro.list[index].id);
  //   console.log(like);
  // };
  //
  // const pushLike = async () => {
  //   await likeSet(token, ro.list[index].id, like);
  // };
  return recipes ? (
    <SafeAreaView style={styles.bg}>
      <View style={styles.containerHome}>
        <Text
          style={{
            fontFamily: 'Mont-Bold',
            fontSize: 20,
            color: '#FFA011',
            textAlign: 'center',
            marginBottom: 25,
          }}>
          keepfoód
        </Text>
        <Text
          style={{
            fontFamily: 'Mont-Bold',
            marginTop: 15,
            fontSize: 22,
          }}>
          Рецепт на ближайший
        </Text>
        <View style={{flexDirection: 'row'}}>
          <Text
            style={{
              fontFamily: 'Mont-Bold',
              marginTop: 15,
              fontSize: 22,
              alignItems: 'center',
            }}>
            приём пищи:
          </Text>
          <SelectList
            setSelected={key => setSelected(key)}
            data={data}
            boxStyles={{borderWidth: 0, width: 150}}
            inputStyles={{
              color: '#FFA011',
              fontFamily: 'Mont-Bold',
              fontSize: 24,
            }}
            dropdownStyles={{
              fontFamily: 'Mont-Bold',
              borderWidth: 0,
              color: '#FFA011',
            }}
            dropdownTextStyles={{
              fontFamily: 'Mont-Bold',
              color: '#FFA011',
              fontSize: 18,
            }}
            save="key"
            search={false}
            defaultOption={{key: 1, value: 'завтрак'}}
          />
        </View>

        <View style={{width: '100%', zIndex: 1, paddingTop: 20}} />
        <CardStack
          loop={true}
          // horizontalSwipe={false}
          disableLeftSwipe={true}
          disableRightSwipe={true}
          renderNoMoreCards={() => null}
          // disableBottomSwipe={true}
          // onSwiped={val => setIndex(val)}
          ref={swiper => (this.swiper = swiper)}>
          {recipesStack}
        </CardStack>
      </View>
    </SafeAreaView>
  ) : (
    <PreLoader />
  );
};

export default MainPage;

// function HomeScreen({navigation}) {
//   const [tab, setTab] = useState(1);
//   const [token, setToken] = useState(false);
//   const [index, setIndex] = useState(0);
//   const [recipes, setRecipes] = useState(false);
//   const [ro, setRo] = useState({});
//   const [fats, setFats] = useState(125);
//   const [caloric, setCaloric] = useState(150);
//   const [carbo, setCarbo] = useState(310);
//   const [proteins, setProteins] = useState(230);
//   const [like, setLike] = useState(false);
//   // const [data, setData] = useState(false);
//
//   useEffect(() => {
//     AsyncStorage.getItem('@keepfood:token').then(r => setToken(r));
//   });
//
//   useEffect(() => {
//     sliderData();
//   }, [token, tab, sliderData]);
//
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   const sliderData = async () => {
//     const r = await recipesRequest({
//       token,
//       meals: tab,
//     });
//     try {
//       setRo(r);
//       setRecipes(r.list.slice(0, 5));
//     } catch (err) {
//       console.error(err);
//     }
//   };
//
//   useEffect(() => {
//     pullInfo();
//   }, [index, pullInfo]);
//
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   const pullInfo = async () => {
//     // setLike(ro.list[index].is_liked);
//     const getInfo = await getRecipe(ro.list[index].id, token);
//     try {
//       setCarbo(getInfo.meta.carbohydrates);
//       setFats(getInfo.meta.fats);
//       setProteins(getInfo.meta.proteins);
//       setCaloric(getInfo.meta.caloric_content);
//       setLike(getInfo.is_liked);
//     } catch (err) {
//       console.log(err);
//     }
//     console.log('!', like);
//   };

// useEffect(() => {
//   setIndex(0);
// }, []);

//   const handleOnPress = () => {
//     setLike(prevState => !prevState);
//     console.log('?', like);
//     pushLike();
//     console.log(token);
//     console.log(ro.list[index].id);
//     console.log(like);
//   };
//
//   const pushLike = async () => {
//     await likeSet(token, ro.list[index].id, like);
//   };
//
//   const _renderItem = ({item}) => {
//     const title = item.name;
//     const time = item.cooking_time;
//     const icon = item.icon;
//     const id = item.id;
//
//     return (
//       <View style={{backgroundColor: '#FFFFFF'}}>
//         <Pressable onPress={() => navigation.navigate('Dish', {recipe_id: id})}>
//           <LinearGradient
//             colors={['#272727', 'rgba(0, 0, 0, 0)']}
//             style={{
//               height: 407,
//               width: '100%',
//               borderRadius: 30,
//               position: 'absolute',
//               zIndex: 1,
//             }}
//             start={{x: 0, y: 1}}
//             end={{x: 0, y: 0}}
//           />
//           {/*<ImageCacheProvider*/}
//           {/*  urlsToPreload={baseStorageUrl + icon}*/}
//           {/*  onPreloadComplete={() => console.log('hey there')}>*/}
//           {/*  <CachedImage*/}
//           {/*    source={{uri: baseStorageUrl + icon}}*/}
//           {/*    style={{*/}
//           {/*      height: 407,*/}
//           {/*      width: '100%',*/}
//           {/*      borderRadius: 30,*/}
//           {/*      position: 'absolute',*/}
//           {/*    }}*/}
//           {/*  />*/}
//           {/*</ImageCacheProvider>*/}
//           <Image
//             source={{uri: baseStorageUrl + icon}}
//             style={{
//               height: 407,
//               width: '100%',
//               borderRadius: 30,
//               position: 'absolute',
//               //opacity: 0.5,
//             }}
//           />
//           <View style={{margin: 15, zIndex: 1}}>
//             <View
//               style={{
//                 flexDirection: 'row',
//                 justifyContent: 'space-between',
//                 width: '100%',
//               }}>
//               <Pressable
//                 style={{
//                   width: 99,
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   borderRadius: 15,
//                   height: 44,
//                   backgroundColor: 'rgba(255, 255, 255, 0.3)',
//                 }}>
//                 <Text
//                   style={{
//                     color: 'white',
//                     fontSize: 14,
//                     fontFamily: 'Mont-Regular',
//                     lineHeight: 17.89,
//                   }}>
//                   {time} мин
//                 </Text>
//               </Pressable>
//               <Pressable
//                 onPress={() => {
//                   handleOnPress();
//                 }}
//                 style={{
//                   width: 44,
//                   height: 44,
//                   borderRadius: 15,
//                   backgroundColor: 'rgba(255, 255, 255, 0.3)',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                 }}>
//                 <MyIcon
//                   name="frame-5019"
//                   size={18}
//                   color={like ? 'red' : 'white'}
//                 />
//               </Pressable>
//             </View>
//             <Text
//               style={{
//                 color: 'white',
//                 fontSize: 28,
//                 fontFamily: 'Mont-Bold',
//                 lineHeight: 35.78,
//                 marginTop: normalize(175),
//                 width: '100%',
//                 textAlign: 'center',
//                 zIndex: 1,
//               }}>
//               {title.length >= 17 ? title.slice(0, 17) + '...' : title}
//             </Text>
//             <Text
//               style={{
//                 color: 'white',
//                 fontSize: 12,
//                 fontFamily: 'Mont-Bold',
//                 lineHeight: 19.2,
//                 width: '100%',
//                 textAlign: 'center',
//                 zIndex: 1,
//                 marginTop: normalize(15),
//               }}>
//               {item.desc.length >= 90
//                 ? item.desc.slice(0, 83) + '...'
//                 : item.desc}
//             </Text>
//             <View
//               style={{
//                 flexDirection: 'row',
//                 justifyContent: 'space-between',
//                 position: 'relative',
//                 marginTop: normalize(15),
//                 width: '100%',
//               }}>
//               <View style={{flexDirection: 'column', alignItems: 'center'}}>
//                 <Text style={styles.firTitle}>Калорийность</Text>
//                 <Text style={styles.nums}>{caloric}</Text>
//                 <Text style={styles.secTitle}>ккал</Text>
//               </View>
//               <View style={{flexDirection: 'column', alignItems: 'center'}}>
//                 <Text style={styles.firTitle}>Белки</Text>
//                 <Text style={styles.nums}>{proteins}</Text>
//                 <Text style={styles.secTitle}>грамм</Text>
//               </View>
//               <View style={{flexDirection: 'column', alignItems: 'center'}}>
//                 <Text style={styles.firTitle}>Жиры</Text>
//                 <Text style={styles.nums}>{fats}</Text>
//                 <Text style={styles.secTitle}>грамм</Text>
//               </View>
//               <View style={{flexDirection: 'column', alignItems: 'center'}}>
//                 <Text style={styles.firTitle}>Углеводы</Text>
//                 <Text style={styles.nums}>{carbo}</Text>
//                 <Text style={styles.secTitle}>грамм</Text>
//               </View>
//             </View>
//           </View>
//         </Pressable>
//       </View>
//     );
//   };
//
//   return recipes ? (
//     <View style={{backgroundColor: '#FFFFFF', flex: 1}}>
//       <View style={styles.container}>
//         <Text
//           style={{
//             fontFamily: 'Mont-Bold',
//             marginTop: 55,
//             fontSize: 22,
//           }}>
//           Рецепт на ближайший приём пищи:
//         </Text>
//         <View style={{width: '100%', zIndex: 1, paddingTop: 20}}>
//           <CustomSwitch
//             selectionMode={1}
//             option1="завтрак"
//             option2="обед"
//             option3="ужин"
//             option4="перекус"
//             onSelectSwich={onSelectSwich}
//           />
//         </View>
//         <Carousel
//           ref={c => {
//             this._carousel = c;
//           }}
//           data={recipes}
//           renderItem={_renderItem}
//           sliderWidth={Dimensions.get('window').width - 30}
//           itemWidth={Dimensions.get('window').width - 30}
//           loop={true}
//           onSnapToItem={index => setIndex(index)}
//           containerCustomStyle={{
//             flex: 1,
//             zIndex: 0,
//             marginTop: 20,
//             borderRadius: 30,
//           }}
//         />
//         <Pagination
//           dotsLength={recipes.length}
//           activeDotIndex={index}
//           containerStyle={{zIndex: 1, marginBottom: 59}}
//           dotStyle={{
//             width: 8,
//             height: 8,
//             borderRadius: 20,
//             backgroundColor: '#FAA011',
//           }}
//           inactiveDotStyle={{backgroundColor: '#EBEBEB'}}
//           inactiveDotOpacity={1}
//           inactiveDotScale={1}
//         />
//       </View>
//     </View>
//   ) : (
//     <PreLoader />
//   );
// }
// export default HomeScreen;
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#FFFFFF',
//     position: 'relative',
//     margin: 15,
//   },
//   firTitle: {
//     fontSize: 10,
//     fontWeight: '600',
//     lineHeight: 12.78,
//     color: 'white',
//     fontFamily: 'Mont-Regular',
//   },
//   nums: {
//     lineHeight: 20.56,
//     color: 'white',
//     fontWeight: '700',
//     fontSize: 20,
//     fontFamily: 'Mont-Regular',
//   },
//   secTitle: {
//     fontSize: 10,
//     fontWeight: '600',
//     lineHeight: 12.78,
//     color: 'white',
//     fontFamily: 'Mont-Regular',
//   },
// });
