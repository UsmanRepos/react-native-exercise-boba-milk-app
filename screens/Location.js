import { StyleSheet, Text, View, TextInput, FlatList, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { HeaderBar, IconButton, TabButtons } from '../components'
import { COLORS, SIZES, FONTS, icons, images } from '../constants'
import { location } from '../utils'

const Location = ({ navigation }) => {
  const { appTheme } = useSelector(state => state.themeReducer)
  const [selectedTab, setSelectedTab] = useState(0)

  const renderHeader = () => {
    return (
      <SafeAreaView
        style={{
          width: '100%',
          height: 120,
          alignItems: 'center',
          backgroundColor: COLORS.primary
        }}
      >
        <View
          style={{
            width: '100%',
            height: '100%',
            flexDirection: 'row',
            paddingHorizontal: SIZES.padding,
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          {/* Back Button */}
          <IconButton
            icon={icons.leftArrow}
            onPress={() => navigation.goBack()}
          />

          {/* Title */}
          <Text style={{ color: COLORS.white, ...FONTS.h1, fontSize: 25 }}>Locations</Text>

          {/* Empty View */}
          <View
            style={{ width: 25 }}
          ></View>

        </View>
      </SafeAreaView>
    );
  };

  const renderTabBar = () => {
    return (
      <View
        style={{
          flexDirection: 'row'
        }}
      >
        {/* Near By */}
        <TabButtons
          containerStyle={{
            width: 80
          }}
          label={"Nearby"}
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
    );
  };

  const renderSearchBar = () => {
    return (
      <View
        style={{
          height: 50,
          marginTop: SIZES.radius,
          flexDirection: 'row',
          paddingHorizontal: SIZES.padding,
          borderRadius: 25,
          alignItems: 'center',
          backgroundColor: COLORS.lightGreen2
        }}
      >
        <TextInput
          style={{
            flex: 1,
            height: 50,
            color: COLORS.black,
            ...FONTS.body3
          }}
          placeholder="Enter your city, state or zip code"
          placeholderTextColor={COLORS.lightGray2}
        />

        <Image
          source={icons.search}
          resizeMode='contain'
          style={{
            width: 30,
            height: 30,
            tintColor: COLORS.lightGray2
          }}
        />
      </View>
    );
  };

  const renderLocationList = () => {
    return (
      <FlatList
        style={{
          marginTop: SIZES.radius,
          paddingHorizontal: SIZES.radius
        }}
        data={location}
        keyExtractor={item => `${item.id}`}
        showsVerticalScrollIndicator={false}
        keyboardDismissMode='on-drag'
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={{
              paddingHorizontal: SIZES.padding,
              paddingVertical: SIZES.radius,
              marginBottom: SIZES.radius,
              borderRadius: SIZES.radius * 2,
              backgroundColor: appTheme.cardBackgroundColor
            }}
            onPress={() => navigation.navigate('order', { selectedLocation: item })}
          >
            {/* Name & Bookmarks */}
            <View
              style={{
                flexDirection: 'row'
              }}
            >
              <Text style={{ color: appTheme.textColor, ...FONTS.h2, flex: 1 }}>{item.title}</Text>
              <Image
                source={item.bookmarked ? icons.bookmarkFilled : icons.bookmark}
                resizeMode='contain'
                style={{
                  width: 20,
                  height: 20,
                  tintColor: item.bookmarked ? COLORS.red2 : COLORS.white
                }}
              />
            </View>

            {/* Address */}
            <View
              style={{
                marginTop: SIZES.base,
                width: '80%'
              }}
            >
              <Text style={{ color: appTheme.textColor, ...FONTS.body3, lineHeight: 21 }}>{item.address}</Text>
            </View>

            {/* Operations Hours */}
            <View
              style={{
                marginTop: SIZES.base
              }}
            >
              <Text style={{ color: appTheme.textColor, ...FONTS.body5, lineHeight: 16 }}>{item.operation_hours}</Text>
            </View>

            {/* Services */}
            <View
              style={{
                flexDirection: 'row',
                marginTop: SIZES.base
              }}
            >
              {/* Pick-Up */}
              <View
                style={{
                  borderRadius: 20,
                  borderWidth: 1,
                  borderColor: appTheme.textColor,
                  paddingHorizontal: SIZES.radius,
                  paddingVertical: 5
                }}
              >
                <Text style={{ color: appTheme.textColor, ...FONTS.body3 }}>Pick Up</Text>
              </View>

              {/* Delivery */}
              <View
                style={{
                  borderRadius: 20,
                  borderWidth: 1,
                  borderColor: appTheme.textColor,
                  paddingHorizontal: SIZES.radius,
                  paddingVertical: 5,
                  marginLeft: 5
                }}
              >
                <Text style={{ color: appTheme.textColor, ...FONTS.body3 }}>Pick Up</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    );
  };


  return (
    <View style={{ flex: 1 }}>
      {/* Header   */}
      {renderHeader()}

      {/* Details */}
      <View
        style={{
          flex: 1,
          marginTop: -20,
          borderTopRightRadius: SIZES.radius * 2,
          borderTopLeftRadius: SIZES.radius * 2,
          backgroundColor: appTheme.backgroundColor,
          padding: SIZES.padding
        }}
      >
        {renderTabBar()}
        {renderSearchBar()}
        {renderLocationList()}
      </View>
    </View>
  )
}

export default Location

const styles = StyleSheet.create({})