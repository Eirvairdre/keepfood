import React, {useEffect, useState} from 'react';

import Reg from '../components/Main';
import Slider from '../components/Slider';
import Reg1 from '../components/Reg1';
import SignIn from '../components/SignIn';
import Skills from '../components/Skills';
import Times from '../components/Times';
import DishesBreakfast from '../components/DishesBreakfast';
import DishesLunch from '../components/DishesLunch';
import DishesDinner from '../components/DishesDinner';
import DishesSnack from '../components/DishesSnack';
import Allergy from '../components/Allergy';
import TabNavigator from '../Navigation';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import {profileInit, mealsInit, allergiesAdd} from '../api/profile';
// import {AsyncStorage} from 'react-native';
// import {GetRecipes} from '../api/recommends';

const Stack = createNativeStackNavigator();

export default function Navigate() {
  const [budget, setBudget] = useState(false);
  console.log(budget);
  const [times, setTimes] = useState(false);
  console.log(times);
  const [skills, setSkills] = useState(false);
  console.log(skills);
  const [dishesBreakfast, setDishesBreakfast] = useState(false);
  console.log(dishesBreakfast);
  const [dishesLunch, setDishesLunch] = useState(false);
  console.log(dishesLunch);
  const [dishesDinner, setDishesDinner] = useState(false);
  console.log(dishesDinner);
  const [dishesSnack, setDishesSnack] = useState(false);
  console.log(dishesSnack);
  // const [allergies, setAllergies] = useState(false);
  // console.log(allergies);
  // const [dishes, setDishes] = useState();
  //
  let budget_min = budget[0];
  let budget_max = budget[1];
  //
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // const vectors = () => {
  //   if (dishesBreakfast && dishesLunch && dishesLunch && dishesSnack) {
  //     setDishes([
  //       ...dishesBreakfast,
  //       ...dishesLunch,
  //       ...dishesLunch,
  //       ...dishesSnack,
  //     ]);
  //   }
  // };
  //
  // useEffect(() => vectors, [dishes, vectors]);
  //
  // const tokenApp = async () => {
  //   const token = await AsyncStorage.getItem('@keepfood:token');
  //   try {
  //     await profileInit(token, budget_min, budget_max, skills);
  //     await mealsInit(token, times);
  //     // await allergiesAdd(token, allergies);
  //     console.log('gvgy', dishes);
  //     await GetRecipes(token, dishes);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Reg"
          component={Reg}
          options={{headerShown: false, gestureEnabled: false}}
        />
        <Stack.Screen
          name="Slider"
          options={{headerShown: false, gestureEnabled: false}}>
          {(...v) => <Slider setBudget={setBudget} {...v} />}
        </Stack.Screen>
        <Stack.Screen
          name="Reg1"
          component={Reg1}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SignIn"
          component={SignIn}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Skills"
          options={{headerShown: false, gestureEnabled: false}}>
          {(...v) => <Skills setSkills={setSkills} {...v} />}
        </Stack.Screen>
        <Stack.Screen
          name="Times"
          options={{headerShown: false, gestureEnabled: false}}>
          {(...v) => <Times setTimes={setTimes} {...v} />}
        </Stack.Screen>
        <Stack.Screen
          name="DishesBreakfast"
          options={{headerShown: false, gestureEnabled: false}}>
          {(...v) => (
            <DishesBreakfast setDishesBreakfast={setDishesBreakfast} {...v} />
          )}
        </Stack.Screen>
        <Stack.Screen
          name="DishesLunch"
          options={{headerShown: false, gestureEnabled: false}}>
          {(...v) => <DishesLunch setDishesLunch={setDishesLunch} {...v} />}
        </Stack.Screen>
        <Stack.Screen
          name="DishesDinner"
          options={{headerShown: false, gestureEnabled: false}}>
          {(...v) => <DishesDinner setDishesDinner={setDishesDinner} {...v} />}
        </Stack.Screen>
        <Stack.Screen
          name="DishesSnack"
          options={{headerShown: false, gestureEnabled: false}}>
          {(...v) => <DishesSnack setDishesSnack={setDishesSnack} {...v} />}
        </Stack.Screen>
        <Stack.Screen
          name="Allergy"
          options={{
            headerShown: false,
            gestureEnabled: false,
          }}>
          {(...v) => (
            <Allergy
              budget_min={budget_min}
              budget_max={budget_max}
              skills={skills}
              times={times}
              dishesBreakfast={dishesBreakfast}
              dishesLunch={dishesLunch}
              dishesDinner={dishesDinner}
              dishesSnack={dishesSnack}
              {...v}
            />
          )}
        </Stack.Screen>
        <Stack.Screen
          name="MainPage"
          component={TabNavigator}
          options={{headerShown: false, gestureEnabled: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
