import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React from 'react'
import { toggleTheme } from '../actions'
import { useSelector, useDispatch } from 'react-redux'
import { COLORS, SIZES, FONTS, icons } from '../constants'

const HeaderBar = () => {

    const { appTheme } = useSelector((state) => state.themeReducer)
    const dispatch = useDispatch()

    const toggleThemeHandler = () => {
        if (appTheme?.name == "light") {
            dispatch(toggleTheme("dark"))
        } else {
            dispatch(toggleTheme("light"))
        }
    };

    return (
        <SafeAreaView
            style={{
                width: "100%",
                height: 150,
                flexDirection: 'row',
                backgroundColor: COLORS.purple
            }}
        >
            {/* Greeting */}
            <View
                style={{
                    flex: 1,
                    paddingLeft: SIZES.padding
                }}
            >
                <Text style={{ color: COLORS.white, ...FONTS.h2 }}>Usman,</Text>
                <Text style={{ color: COLORS.white, ...FONTS.h2 }}>Welcome Back!</Text>
            </View>

            {/* Toggle Button */}
            <TouchableOpacity
                style={{
                    height: 40,
                    flexDirection: 'row',
                    marginHorizontal: SIZES.padding,
                    backgroundColor: COLORS.lightPurple,
                    borderRadius: 20,
                    justifyContent: 'center',
                    alignItems: 'flex-end'
                }}
                onPress={() => toggleThemeHandler()}
            >
                {/* Sun */}
                <View
                    style={[{
                        width: 40,
                        height: 40,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }, (appTheme?.name === "light") ?
                        styles.selectedLightModeStyle : {}]}
                >
                    <Image
                        source={icons.sunny}
                        resizeMode='contain'
                        style={{
                            width: 30,
                            height: 30,
                            tintColor: COLORS.white
                        }}
                    />
                </View>

                {/* Moon */}
                <View
                    style={[{
                        width: 40,
                        height: 40,
                        justifyContent: 'center',
                        alignItems: 'center',

                    }, (appTheme?.name === "dark") ?
                        styles.selectedNightModeStyle : {}]}
                >
                    <Image
                        source={icons.night}
                        resizeMode='contain'
                        style={{
                            width: 30,
                            height: 30,
                            tintColor: COLORS.white
                        }}
                    />
                </View>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    selectedNightModeStyle: {
        borderRadius: 20,
        backgroundColor: COLORS.black
    },
    selectedLightModeStyle: {
        borderRadius: 20,
        backgroundColor: COLORS.yellow
    }
})

export default HeaderBar

