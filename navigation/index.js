import { View, Text, Image, Platform, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator, BottomTabBar } from '@react-navigation/bottom-tabs'
import Svg, { Path } from 'react-native-svg'
import { isIphoneX } from 'react-native-iphone-x-helper'

import { COLORS, SIZES, icons, images } from '../constants'
import { Home, Location, Order, OrderDetail, Rewards } from '../screens'

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

const TabBar = ({ props }) => {
    if (isIphoneX) {
        console.log("e")
        return (
            <View>
                <View
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        right: 0,
                        left: 0,
                        height: 30,
                        backgroundColor: COLORS.gray3
                    }}
                />
                <BottomTabBar {...props} />
            </View>
        );
    } else {
        return (
            <BottomTabBar  {...props} />
        );
    };
};

const TabBarButton = ({ children, onPress, containerStyle, isFloat }) => {
    if (isFloat) {
        return (
            <View
                style={{
                    flex: 1,
                    alignItems: 'center'
                }}
            >
                <Svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={90}
                    height={61}
                    viewBox="0 0 90 61"
                >
                    <Path
                        d="M0 0a38.742 38.742 0 0113 7c5.313 4.4 6.7 8.593 12 13 5.993 4.98 12.987 8 20 8s14.007-3.02 20-8c5.3-4.408 6.687-8.6 12-13a38.742 38.742 0 0113-7v61H0V0z"
                        fill="#4d4d4d"
                        fillRule="evenodd"
                    />
                </Svg>

                <TouchableOpacity
                    style={{
                        position: 'absolute',
                        top: -40,
                        width: 60,
                        height: 60,
                        borderRadius: 30,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: COLORS.primary
                    }}
                    onPress={onPress}
                >
                    {children}
                </TouchableOpacity>

            </View>
        )
    } else {
        return (
            <TouchableWithoutFeedback
                onPress={onPress}
            >
                <View
                    style={{
                        flex: 1,
                        height: 60,
                        backgroundColor: COLORS.gray3,
                        ...containerStyle
                    }}
                >
                    {children}
                </View>
            </TouchableWithoutFeedback>
        )
    }
};

const TabsScreen = () => (
    <Tab.Navigator
        screenOptions={({ route }) => ({
            tabBarShowLabel: false,
            headerShown: false,
            tabBarStyle: {
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: 0,
                elevation: 0,
                borderTopColor: 'transparent',
                height: Platform.OS === 'ios' ? 80 : 60,
                backgroundColor: 'transparent'
            }
        })}
        tabBar={(props) => (
            <TabBar props={props} />
        )}
    >
        <Tab.Screen
            name="home"
            component={Home}
            options={{
                tabBarIcon: ({ focused }) => (
                    <Image
                        source={icons.home}
                        resizeMode="contain"
                        style={{
                            width: 35,
                            height: 35,
                            tintColor: focused ? COLORS.primary : COLORS.black
                        }}
                    />
                ),
                tabBarButton: (props) => (
                    <TabBarButton
                        {...props}
                        containerStyle={{
                            borderTopLeftRadius: SIZES.radius * 5
                        }}
                    />
                ),
            }}
        />
        <Tab.Screen
            name="rewards"
            component={Rewards}
            options={{
                tabBarIcon: ({ focused }) => (
                    <Image
                        source={icons.bubbleTea}
                        resizeMode="contain"
                        style={{
                            width: 35,
                            height: 35,
                            tintColor: focused ? COLORS.primary : COLORS.black
                        }}
                    />
                ),
                tabBarButton: (props) => (
                    <TabBarButton
                        {...props}
                        containerStyle={{
                            marginRight: 6
                        }}

                    />
                ),
            }}
        />

        <Tab.Screen
            name="addOrder"
            component={Home}
            options={{
                tabBarIcon: ({ focused }) => (
                    <Image
                        source={icons.add}
                        resizeMode="contain"
                        style={{
                            width: 35,
                            height: 35,
                            tintColor: COLORS.white
                        }}
                    />
                ),
                tabBarButton: (props) => (
                    <TabBarButton
                        {...props}
                        isFloat={true}
                    />
                ),
            }}
        />
        <Tab.Screen
            name="favourite"
            component={Home}
            options={{
                tabBarIcon: ({ focused }) => (
                    <Image
                        source={icons.heart}
                        resizeMode="contain"
                        style={{
                            width: 35,
                            height: 35,
                            tintColor: focused ? COLORS.primary : COLORS.black
                        }}
                    />
                ),
                tabBarButton: (props) => (
                    <TabBarButton
                        {...props}
                        containerStyle={{
                            marginLeft: 6
                        }}
                    />
                ),
            }}
        />
        <Tab.Screen
            name="profile"
            component={Home}
            options={{
                tabBarIcon: ({ focused }) => (
                    <Image
                        source={icons.profile}
                        resizeMode="contain"
                        style={{
                            width: 35,
                            height: 35,
                            tintColor: focused ? COLORS.primary : COLORS.black
                        }}
                    />
                ),
                tabBarButton: (props) => (
                    <TabBarButton
                        {...props}
                        containerStyle={{
                            borderTopRightRadius: SIZES.radius * 5
                        }}
                    />
                ),
            }}
        />
    </Tab.Navigator>
);

const StackScreen = () => (
    <Stack.Navigator
        screenOptions={{
            headerShown: false
        }}
        initialRouteName={'home'}
    >
        <Stack.Screen
            name='home'
            component={TabsScreen}
        />
        <Stack.Screen
            name="location"
            component={Location}
        />

        <Stack.Screen
            name="order"
            component={Order}
        />

        <Stack.Screen
            name="orderDetail"
            component={OrderDetail}
        />
    </Stack.Navigator>
);

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        border: 'transparent'
    }
};

const Index = () => {
    return (
        <NavigationContainer theme={theme}>
            <StackScreen />
        </NavigationContainer>
    )
}

export default Index