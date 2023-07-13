import React from 'react'
import {View, Text, Image} from 'react-native';

export default function BannerSlider({data}) {
    return (
        <View>
            <Image source={data.image} style={{height: 521, width: '100%', borderRadius:30}} />
        </View>
    );
}
