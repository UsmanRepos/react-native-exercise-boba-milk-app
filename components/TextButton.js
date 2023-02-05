import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS } from '../constants';

const TextButton = ({ containerStyle, label, labelStyle, onPress, isPrimary }) => {
    return (
        <TouchableOpacity
            style={{
                justifyContent: 'center',
                alignItems: "center",
                backgroundColor: isPrimary ? COLORS.primary : 'transparent',
                borderColor: isPrimary ? 'transparent' : COLORS.primary,
                borderWidth: isPrimary ? 0 : 1,
                ...containerStyle
            }}
            onPress={onPress}
        >
            <Text
                style={{
                    color: isPrimary ? COLORS.white : COLORS.primary,
                    ...labelStyle
                }}
            >{label}</Text>
        </TouchableOpacity>
    );
};

export default TextButton

const styles = StyleSheet.create({})