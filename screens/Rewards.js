import { StyleSheet, Text, View, FlatList, ImageBackground } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { HeaderBar, TextButton } from '../components'
import { COLORS, FONTS, SIZES, icons, images } from '../constants'
import { availableRewards } from '../utils'

const Rewards = ({ navigation }) => {
  const { appTheme } = useSelector(state => state.themeReducer)


  const renderRewardPointSection = () => {

    return (
      <View
        style={{
          alignItems: 'center',
          marginVertical: SIZES.padding
        }}
      >
        {/* Text */}
        <Text style={{ color: COLORS.primary, ...FONTS.h1, fontSize: 35 }}>Reward</Text>
        <Text
          style={{
            color: appTheme?.textColor,
            ...FONTS.h3,
            lineHeight: 18,
            width: SIZES.width * 0.6,
            textAlign: 'center',
            marginTop: 10
          }}
        >You are 60 points away from your next reward</Text>

        {/* Image */}
        <ImageBackground
          source={icons.reward_cup}
          resizeMode='contain'
          style={{
            marginTop: SIZES.padding,
            width: SIZES.width * 0.8,
            height: SIZES.width * 0.8,
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <View
            style={{
              width: 70,
              height: 70,
              borderRadius: 35,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: COLORS.white
            }}
          >
            <Text style={{ ...FONTS.h1 }}>280</Text>
          </View>
        </ImageBackground>
      </View>
    );
  };

  const renderHeaderLabel = () => {
    return (
      <View
        style={{
          marginTop: SIZES.padding,
          marginBottom: SIZES.radius,
          paddingHorizontal: SIZES.padding
        }}
      >
        <Text style={{ color: appTheme?.textColor, ...FONTS.h2 }}>Available Rewards</Text>
      </View>
    );
  };

  const renderButtons = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >

        {/* Scan */}
        <TextButton
          isPrimary={true}
          label="Scan in store"
          containerStyle={{
            width: 130,
            paddingVertical: 5,
            marginRight: SIZES.radius,
            borderRadius: SIZES.radius * 2
          }}
          labelStyle={{
            ...FONTS.h3
          }}
          onPress={() => navigation.navigate("location")}
        />
        {/* Redeem */}
        <TextButton
          isPrimary={false}
          label="Redeem"
          containerStyle={{
            width: 130,
            paddingVertical: 5,
            marginRight: SIZES.radius,
            borderRadius: SIZES.radius * 2
          }}
          labelStyle={{
            ...FONTS.h3
          }}
          onPress={() => navigation.navigate("location")}
        />
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Header */}
      <HeaderBar />

      {/* Details */}
      <FlatList
        style={{
          flex: 1,
          marginTop: -25,
          borderTopLeftRadius: SIZES.radius * 2,
          borderTopRightRadius: SIZES.radius * 2,
          backgroundColor: appTheme?.backgroundColor
        }}
        contentContainerStyle={{
          paddingBottom: 120
        }}
        data={availableRewards}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => `${item.id}`}
        ListHeaderComponent={
          <View>
            {/* Reward Points */}
            {renderRewardPointSection()}

            {/* Buttons */}
            {renderButtons()}

            {/* Header Label */}
            {renderHeaderLabel()}
          </View>
        }
        renderItem={({ item, index }) => {
          return (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginHorizontal: SIZES.padding,
                marginBottom: SIZES.base,
                paddingVertical: SIZES.base,
                borderRadius: 20,
                backgroundColor: item.eligible ? COLORS.yellow : COLORS.gray2
              }}
            >
              <Text style={{ color: item.eligible ? COLORS.black : COLORS.lightGray2, ...FONTS.body3 }}>{item?.title}</Text>
            </View>
          );
        }}
      />
    </View>
  );
};

export default Rewards

const styles = StyleSheet.create({})