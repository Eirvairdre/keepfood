import React from 'react';
import {Dimensions, View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const PreLoader = () => (
  <View style={{flex: 1, alignItems: 'center', backgroundColor: 'white'}}>
    <View style={{margin: 15}}>
      <SkeletonPlaceholder>
        <View style={{alignItems: 'center'}}>
          <View
            style={{
              height: 47,
              width: Dimensions.get('screen').width - 30,
              borderRadius: 5,
              marginTop: 30,
            }}
          />
        </View>
        <View style={{alignItems: 'center'}}>
          <View
            style={{
              height: 31,
              width: Dimensions.get('screen').width - 30,
              borderRadius: 5,
              marginTop: 20,
            }}
          />
        </View>
        <View style={{alignItems: 'center'}}>
          <View
            style={{
              height: Dimensions.get('window').height - 300,
              width: Dimensions.get('screen').width - 20,
              borderRadius: 30,
              marginTop: 20,
            }}
          />
        </View>
      </SkeletonPlaceholder>
    </View>
  </View>
);

export default PreLoader;
