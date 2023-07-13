import React, {useRef} from 'react';
import {View, Text} from 'react-native';

import Lottie from 'lottie-react-native';

const Loader = () => {
  const animationRef = useRef < Lottie > null;
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1,
      }}>
      <Lottie
        source={require('../../assets/animation_l8iqenn0.json')}
        autoPlay
        loop
        resizeMode="contain"
        // autoSize={true}
        speed={0.6}
      />
    </View>
  );
};

export default Loader;
