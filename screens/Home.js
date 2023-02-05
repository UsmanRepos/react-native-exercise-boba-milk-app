import { StyleSheet, Text, View, ScrollView, TouchableOpacity, ImageBackground, Animated, Image } from 'react-native'
import React, { createRef, useCallback, useEffect, useRef, useState } from 'react'
import { HeaderBar, TextButton } from '../components'
import { COLORS, SIZES, icons, FONTS, constants, images } from '../constants'
import { useSelector } from 'react-redux'
import { promos } from '../utils'

const promoTabs = constants.promoTabs.map((promoTab) => ({
    ...promoTab,
    ref: createRef()
}));

const TabIndicator = ({ measureLayout, scrollX }) => {

    const inputRange = promoTabs.map((_, i) => SIZES.width * i);

    const tabIndicatorWidth = scrollX.interpolate({
        inputRange,
        outputRange: measureLayout.map(measure => measure.width),
    });

    const translateX = scrollX.interpolate({
        inputRange,
        outputRange: measureLayout.map(measure => measure.x)
    });

    return (
        <Animated.View
            style={{
                position: 'absolute',
                left: 0,
                width: tabIndicatorWidth,
                height: '100%',
                backgroundColor: COLORS.primary,
                borderRadius: SIZES.radius,
                transform: [
                    {
                        translateX: translateX
                    }
                ]
            }}
        />
    );
};

const Tabs = ({ appTheme, scrollX, onTabPress }) => {
    const [measureLayout, setMeasureLayout] = useState([])
    const containerRef = useRef()
    const tabPosition = Animated.divide(scrollX, SIZES.width)

    useEffect(() => {
        let ml = []
        promoTabs.forEach(promo => {
            promo?.ref?.current?.measureLayout(
                containerRef.current,
                (x, y, width, height) => {

                    ml.push({
                        x, y, width, height
                    })

                    if (ml.length === promoTabs.length) {
                        setMeasureLayout(ml)
                    }
                }
            );
        });

    }, [containerRef.current]);

    return (
        <View
            ref={containerRef}
            style={{
                position: 'relative',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: SIZES.padding,
                borderRadius: SIZES.radius,
                backgroundColor: appTheme?.tabBackgroundColor
            }}
        >
            {/* Tab Indicator */}
            {measureLayout.length > 0 &&
                <TabIndicator
                    measureLayout={measureLayout}
                    scrollX={scrollX}
                />
            }


            {/* Tab */}
            {
                promoTabs.map((item, index) => {

                    const textColor = tabPosition.interpolate({
                        inputRange: [index - 1, index, index + 1],
                        outputRange: [COLORS.lightGray2, COLORS.white, COLORS.lightGray2],
                        extrapolate: 'clamp'
                    });

                    return (
                        <TouchableOpacity
                            ref={item?.ref}
                            key={`PromoTab-${index}`}
                            onPress={() => onTabPress(index)}
                        >
                            <View
                                style={{
                                    height: 40,
                                    paddingHorizontal: 15,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                            >
                                <Animated.Text style={{ color: textColor, ...FONTS.h3 }}>{item?.title}</Animated.Text>
                            </View>
                        </TouchableOpacity>
                    )
                })
            }
        </View>
    );
};

const Home = ({ navigation }) => {
    const { appTheme } = useSelector((state) => state.themeReducer)
    const scrollX = useRef(new Animated.Value(0)).current
    const promoRef = useRef()

    
    const onTabPress = useCallback((tabIndex) => {
        promoRef?.current?.scrollToOffset({
            offset: tabIndex * SIZES.width
        })
    });

    const renderAvailableRewards = () => {
        return (
            <TouchableOpacity
                style={{
                    height: 100,
                    flexDirection: 'row',
                    marginTop: SIZES.padding,
                    marginHorizontal: SIZES.padding
                }}
                onPress={() => navigation.navigate("rewards")}
            >
                {/* Reward Cup */}
                <View
                    style={{
                        width: 100,
                        height: "100%",
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderTopLeftRadius: 15,
                        borderBottomLeftRadius: 15,
                        backgroundColor: COLORS.pink
                    }}
                >
                    <ImageBackground
                        source={icons.reward_cup}
                        resizeMode='contain'
                        style={{
                            width: 85,
                            height: 85,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <View
                            style={{
                                width: 30,
                                height: 30,
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginTop: SIZES.radius,
                                borderRadius: 15,
                                backgroundColor: COLORS.transparentBlack
                            }}
                        >
                            <Text style={{ color: COLORS.white, ...FONTS.h4 }}>240</Text>
                        </View>
                    </ImageBackground>
                </View>

                {/* Reward Details */}
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 15,
                        marginLeft: -10,
                        backgroundColor: COLORS.lightPink
                    }}
                >
                    <Text style={{ color: COLORS.primary, ...FONTS.h2, fontSize: 20 }}>Available Rewards</Text>
                    <View
                        style={{
                            marginTop: 5,
                            paddingHorizontal: SIZES.radius,
                            paddingVertical: SIZES.base,
                            borderRadius: SIZES.radius * 2,
                            backgroundColor: COLORS.primary
                        }}
                    >
                        <Text style={{ color: COLORS.white, ...FONTS.body3 }}>150 points - $2.50 off</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    const renderPromoDeals = () => {
        return (
            <View
                style={{
                    flex: 1,
                    alignItems: 'center'
                }}
            >
                {/* Header - Tabs */}
                <Tabs
                    appTheme={appTheme}
                    scrollX={scrollX}
                    onTabPress={onTabPress}
                />

                {/* Promo Details */}
                <Animated.FlatList
                    ref={promoRef}
                    horizontal
                    pagingEnabled
                    snapToAlignment={'center'}
                    scrollEventThrottle={16}
                    showsHorizontalScrollIndicator={false}
                    data={promos}
                    keyExtractor={item => `PromoDetail-${item.id}`}
                    onScroll={Animated.event([
                        { nativeEvent: { contentOffset: { x: scrollX } } }
                    ], {
                        useNativeDriver: false
                    })}
                    renderItem={({ item, index }) => {
                        return (
                            <View
                                style={{
                                    flex: 1,
                                    width: SIZES.width,
                                    paddingTop: SIZES.padding,
                                    alignItems: 'center'

                                }}
                            >
                                {/* Image */}
                                <Image
                                    source={images.strawberryBackground}
                                    resizeMode='contain'
                                    style={{
                                        width: "100%",
                                    }}
                                />

                                {/* Name */}
                                <Text style={{ color: COLORS.red, ...FONTS.h1, fontSize: 27 }}>{item?.name}</Text>

                                {/* Description */}
                                <Text style={{ marginTop: 3, color: appTheme?.textColor, ...FONTS.body4 }}>{item?.description}</Text>

                                {/* Calories */}
                                <Text style={{ marginTop: 3, color: appTheme?.textColor, ...FONTS.body4 }}>Calories: {item?.calories}</Text>

                                {/* Button */}
                                <TextButton
                                    isPrimary={true}
                                    label={"Order Now"}
                                    containerStyle={{
                                        marginTop: 10,
                                        paddingHorizontal: SIZES.padding,
                                        paddingVertical: SIZES.base,
                                        borderRadius: SIZES.radius * 2
                                    }}
                                    labelStyle={{
                                        ...FONTS.h3
                                    }}
                                    onPress={() => navigation.navigate('location')}
                                />
                            </View>
                        );
                    }}

                />
            </View>
        );
    };

    return (
        <View style={{ flex: 1 }}>
            <HeaderBar />

            <ScrollView
                style={{
                    flex: 1,
                    marginTop: -25,
                    borderTopLeftRadius: SIZES.radius * 2,
                    borderTopRightRadius: SIZES.radius * 2,
                    backgroundColor: appTheme?.backgroundColor
                }}
                contentContainerStyle={{
                    paddingBottom: 150
                }}
            >
                {/* Rewards  */}
                {renderAvailableRewards()}

                {/* Promo */}
                {renderPromoDeals()}
            </ScrollView>
        </View>
    )
}

export default Home

const styles = StyleSheet.create({})