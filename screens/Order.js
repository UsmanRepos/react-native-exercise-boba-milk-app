import { StyleSheet, Text, View, TouchableOpacity, Image, SafeAreaView, FlatList, TouchableWithoutFeedback } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Svg, { Circle } from 'react-native-svg'
import { IconButton, TabButtons, VerticalTextButton } from '../components'
import { COLORS, FONTS, SIZES, icons, images } from '../constants'
import { menuList } from '../utils'

const Order = ({ navigation, route }) => {

  const { appTheme } = useSelector(state => state.themeReducer)
  const [selectedLocation, setSelectedLocation] = useState(null)
  const [selectedTab, setSelectedTab] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState("Milk Tea")
  const [menu, setMenu] = useState(null)

  useEffect(() => {
    const { selectedLocation } = route.params
    setSelectedLocation(selectedLocation)

  }, []);

  useEffect(() => {
    let menu = menuList.filter(menuItem => menuItem.category == selectedCategory)
    setMenu(menu)

  }, [selectedCategory]);


  const renderHeader = () => {
    return (
      <SafeAreaView
        style={{
          height: 180,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: COLORS.primary
        }}
      >
        {/* Nav Bar */}
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: SIZES.radius,
            justifyContent: 'space-between',
          }}
        >
          {/* Back Button */}
          <IconButton
            icon={icons.leftArrow}
            onPress={() => navigation.goBack()}
          />

          {/* Title */}
          <Text style={{ color: COLORS.white, ...FONTS.h1, fontSize: 25 }}>Pick-Up-Order</Text>

          {/* Empty View */}
          <View
            style={{ width: 25 }}
          ></View>

        </View>

        {/* Location */}
        <View
          style={{
            marginTop: SIZES.radius,
            paddingVertical: 5,
            paddingHorizontal: SIZES.radius,
            borderRadius: SIZES.padding,
            backgroundColor: COLORS.white1
          }}
        >
          <Text style={{ color: COLORS.primary, ...FONTS.body3 }}>{selectedLocation?.title}</Text>
        </View>
      </SafeAreaView>
    );
  };

  const renderTabBar = () => {
    return (
      <View
        style={{
          height: 50,
          flexDirection: 'row',
          marginTop: SIZES.radius,
          paddingLeft: SIZES.padding,
          paddingRight: SIZES.padding,
          justifyContent: 'center'
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: 'row'
          }}
        >
          {/* Near By */}
          <TabButtons
            containerStyle={{
              width: 70
            }}
            label={"Menu"}
            selected={selectedTab == 0}
            onPress={() => setSelectedTab(0)}
          />

          {/* Previous */}
          <TabButtons
            containerStyle={{
              width: 100
            }}
            label={"Previous"}
            selected={selectedTab == 1}
            onPress={() => setSelectedTab(1)}
          />

          {/* Favourite */}
          <TabButtons
            containerStyle={{
              width: 100
            }}
            label={"Favourite"}
            selected={selectedTab == 2}
            onPress={() => setSelectedTab(2)}
          />
        </View>

        {/* Order Number */}
        <View
          style={{
            width: 35,
            height: 35,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: COLORS.primary
          }}
        >
          <Text style={{ color: COLORS.white, ...FONTS.h3 }}>0</Text>
        </View>

      </View>
    );
  };

  const renderSideBar = () => {
    return (
      <View>
        <Svg width={"65"} height={"65"} viewBox={"0 0 65 65"}>
          <Circle
            cx={"5"}
            cy={"60"}
            r={"60"}
            fill={COLORS.primary}
          />
        </Svg>

        <View
          style={{
            width: 65,
            marginTop: -10,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: COLORS.primary,
            zIndex: 1

          }}
        >
          <VerticalTextButton
            label={"Snack"}
            selected={selectedCategory === "Snack"}
            onPress={() => setSelectedCategory("Snack")}
          />

          <VerticalTextButton
            label={"Coffee"}
            containerStyle={{
              marginTop: 50
            }}
            selected={selectedCategory === "Coffee"}
            onPress={() => setSelectedCategory("Cofee")}
          />

          <VerticalTextButton
            label={"Smoothie"}
            containerStyle={{
              marginTop: 70,
              width: 100
            }}
            selected={selectedCategory === "Smoothie"}
            onPress={() => setSelectedCategory("Smoothie")}
          />

          <VerticalTextButton
            label={"Specialtea"}
            containerStyle={{
              marginTop: 90,
              width: 100
            }}
            selected={selectedCategory === "Specialtea"}
            onPress={() => setSelectedCategory("Specialtea")}
          />

          <VerticalTextButton
            label={"Milk Tea"}
            containerStyle={{
              marginTop: 80,
              width: 80
            }}
            selected={selectedCategory === "Milk Tea"}
            onPress={() => setSelectedCategory("Milk Tea")}
          />

        </View>

        <Svg width={"65"} height={"65"} viewBox={"0 0 65 65"}>
          <Circle
            cx={"5"}
            cy={"0"}
            r={"60"}
            fill={COLORS.primary}
          />
        </Svg>
      </View>
    );
  };


  return (
    <View style={{ flex: 1 }}>
      {/* Header */}
      {renderHeader()}

      {/* Details */}
      <View
        style={{
          flex: 1,
          marginTop: -35,
          borderTopLeftRadius: SIZES.radius * 2,
          borderTopRightRadius: SIZES.radius * 2,
          backgroundColor: appTheme?.backgroundColor
        }}
      >
        {/* Tab Bar */}
        {renderTabBar()}

        {/* Side Bar & Listing */}
        <View
          style={{
            flex: 1,
            flexDirection: 'row'
          }}
        >
          {/* Side Bar */}
          {renderSideBar()}

          {/* Listing */}
          <FlatList
            contentContainerStyle={{
              marginTop: SIZES.padding,
              paddingBottom: 50
            }}
            data={menu}
            keyExtractor={item => `${item.id}`}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => {
              return (
                <TouchableWithoutFeedback
                  onPress={() => navigation.navigate("orderDetail", { selectedItem: item })}
                >
                  <View
                    style={{
                      height: 150,
                      justifyContent: 'flex-end',
                      alignItems: 'flex-end',
                      marginTop: index > 0 ? SIZES.padding : 0,
                      paddingHorizontal: SIZES.padding
                    }}
                  >
                    {/* Thumbnail */}
                    <View
                      style={{
                        width: 130,
                        height: 140,
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'absolute',
                        top: 0, left: SIZES.padding,
                        borderRadius: SIZES.radius,
                        backgroundColor: COLORS.lightYellow,
                        zIndex: 1
                      }}
                    >
                      <Image
                        source={item.thumbnail}
                        resizeMode='contain'
                        style={{
                          width: 100,
                          height: 100
                        }}
                      />
                    </View>

                    {/* Details */}
                    <View
                      style={{
                        width: '70%',
                        height: '85%',
                        paddingLeft: '22%',
                        paddingRight: SIZES.base,
                        paddingVertical: SIZES.base,
                        borderRadius: SIZES.radius,
                        backgroundColor: COLORS.primary,
                        justifyContent: 'space-between'
                      }}
                    >
                      <Text
                        style={{
                          color: COLORS.white,
                          ...FONTS.h2,
                          fontSize: 18,
                          lineHeight: 25
                        }}
                      >{item.name}</Text>

                      <Text
                        style={{
                          color: COLORS.lightYellow,
                          ...FONTS.h2,
                          fontSize: 18
                        }}
                      >{item.price}</Text>
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              );
            }}
          />
        </View>
      </View>
    </View>
  )
}

export default Order

const styles = StyleSheet.create({})