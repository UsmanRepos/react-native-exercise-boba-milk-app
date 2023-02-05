import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS, FONTS } from '../constants'

const TabButtons = ({ containerStyle, label, selected, onPress }) => {
    return (
        <TouchableOpacity
            style={{
                alignItems: 'center',
                ...containerStyle
            }}
            onPress={onPress}
        >
            {/* Text */}
            <Text style={{ color: selected ? COLORS.primary : COLORS.gray, ...FONTS.body2, fontSize: 18 }}>{label}</Text>

            {/* Line */}
            <View
                style={{
                    marginTop: selected ? 3 : 4,
                    height: selected ? 4 : 2,
                    width: '100%',
                    backgroundColor: selected ? COLORS.primary : COLORS.gray
                }}
            >
            </View>
        </TouchableOpacity>
    )
}

export default TabButtons

const styles = StyleSheet.create({})