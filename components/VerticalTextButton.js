import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import {COLORS, FONTS, SIZES} from '../constants'

const VerticalTextButton = ({containerStyle, label, selected, onPress}) => {
  return (
    <TouchableOpacity
        style={{
            alignItems:'center',
            transform:[{rotate:'-90deg'}],
            ...containerStyle
        }}
        onPress={onPress}
    >
        <Text style={{
            color:selected?COLORS.white:COLORS.lightGray2,
            ...FONTS.body3,
            fontSize:16
        }}>{label}</Text>
    </TouchableOpacity>
  )
}

export default VerticalTextButton

const styles = StyleSheet.create({})