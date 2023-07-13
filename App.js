import React, {useEffect, useState} from 'react';
// import {AsyncStorage} from 'react-native';
import 'react-native-gesture-handler';
import RegStack from './src/screens/Navigate';
import Loader from './src/components/Loader';
import {enableLatestRenderer} from 'react-native-maps';

enableLatestRenderer();

const App = () => {
  // useEffect(() => {
  //   AsyncStorage.removeItem('@keepfood:token');
  // });
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => setIsLoading(false), 3000);
  }, []);
  return isLoading ? <Loader /> : <RegStack />;
};
export default App;
