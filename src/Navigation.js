import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import MainPage from './components/MainPage';
import Search from './components/Search';
import Calendar from './components/Calendar';
import Profile from './components/Profile';
import MyIcon from '../assets/fonts/icon-font.js';
import Recipe from './components/RecipeDescription.js';
import OrderShops from './components/OrderShops';
import OrderIngredients from './components/OrderIngredients';
import OrderMap from './components/OrderMap';
import OrderFinal from './components/OrderFinal';
import Booked from './components/Booked';

import Dish from './components/DataDish';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="MainPage" component={MainPage} />
      <Stack.Screen name="Dish" component={Dish} />
      <Stack.Screen name="Recipe" component={Recipe} />
      <Stack.Screen name="OrderShops" component={OrderShops} />
      <Stack.Screen name="OrderIngredients" component={OrderIngredients} />
      <Stack.Screen name="OrderMap" component={OrderMap} />
      <Stack.Screen name="OrderFinal" component={OrderFinal} />
      <Stack.Screen name="Booked" component={Booked} />
      {/*<Stack.Screen name="Edit" component={Edit} />*/}
    </Stack.Navigator>
  );
};

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {height: 100, borderTopWidth: 0},
        tabBarActiveTintColor: '#FAA011',
        tabBarInactiveTintColor: '#9C9C9C',
      }}>
      <Tab.Screen
        name="Главная"
        component={HomeStack}
        options={({route}) => ({
          tabBarStyle: {
            display: getTabBarVisibility(route),
            backgroundColor: 'white',
            height: 100,
            borderTopWidth: 0,
          },
          tabBarIcon: ({tintColor, focused, color, size}) =>
            focused ? (
              <MyIcon name={'home-2'} size={size} color={color} />
            ) : (
              <MyIcon name={'home-1'} size={size} color={color} />
            ),
        })}
      />
      {/*<Tab.Screen*/}
      {/*  name="Поиск"*/}
      {/*  component={Search}*/}
      {/*  options={{*/}
      {/*    tabBarIcon: ({tintColor, focused, color, size}) =>*/}
      {/*      focused ? (*/}
      {/*        <MyIcon name={'search-2'} size={size} color={color} />*/}
      {/*      ) : (*/}
      {/*        <MyIcon name={'search-1'} size={size} color={color} />*/}
      {/*      ),*/}
      {/*  }}*/}
      {/*/>*/}
      {/*<Tab.Screen*/}
      {/*  name="Холодильник"*/}
      {/*  component={Calendar}*/}
      {/*  options={{*/}
      {/*    tabBarIcon: ({tintColor, focused, color, size}) =>*/}
      {/*      focused ? (*/}
      {/*        <MyIcon name={'calendar-1'} size={size} color={color} />*/}
      {/*      ) : (*/}
      {/*        <MyIcon name={'calendar'} size={size} color={color} />*/}
      {/*      ),*/}
      {/*  }}*/}
      {/*/>*/}
      <Tab.Screen
        name="Профиль"
        component={Profile}
        options={{
          tabBarIcon: ({tintColor, focused, color, size}) =>
            focused ? (
              <MyIcon name={'profile-2'} size={size} color={color} />
            ) : (
              <MyIcon name={'profile'} size={size} color={color} />
            ),
        }}
      />
    </Tab.Navigator>
  );
};

const getTabBarVisibility = route => {
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Feed';

  if (
    routeName === 'Dish' ||
    routeName === 'Recipe' ||
    routeName === 'OrderIngredients' ||
    routeName === 'OrderShops' ||
    routeName === 'OrderMap' ||
    routeName === 'OrderFinal'
  ) {
    return 'none';
  }
  return 'flex';
};
export default TabNavigator;
