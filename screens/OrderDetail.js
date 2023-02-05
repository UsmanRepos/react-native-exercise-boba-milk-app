import { StyleSheet, Text, View, Image, ImageBackground, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { IconButton } from '../components'
import { COLORS, FONTS, SIZES, icons, images } from '../constants'
import { } from '../utils'
import { milkList } from '../constants/dummy'

const OrderDetail = ({ navigation, route }) => {

  const { appTheme } = useSelector(state => state.themeReducer)
  const [selectedItem, setSelectedItem] = useState(null)
  const [selectedSize, setSelectedSize] = useState(32)
  const [milkIndex, setMilkIndex] = useState(0)
  const [sweetnessLevel, setSweetnessLevel] = useState(50)
  const [iceLevel, setIceLevel] = useState(25)

  useEffect(() => {
    const { selectedItem } = route.params
    setSelectedItem(selectedItem)
  }, []);

  const renderHeader = () => {
    return (
      <View
        style={{
          width: '100%',
          height: '55%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <View
          style={{
            position: 'absolute',
            right: 0, bottom: 0,
            top: 0, left: 40,
            backgroundColor: COLORS.primary,
            borderBottomLeftRadius: 100
          }}
        />

        <Image
          source={selectedItem?.thumbnail}
          resizeMode='contain'
          style={{
            width: SIZES.width * 0.7,
            height: SIZES.width * 0.7
          }}
        />

        {/* Back Button */}
        <IconButton
          containerStyle={{
            position: 'absolute',
            top: 45, left: 20,
            padding: 10,
            borderRadius: SIZES.radius,
            backgroundColor: COLORS.black
          }}
          icon={icons.leftArrow}
          onPress={() => navigation.goBack()}
        />

      </View>
    );
  };

  const renderDetail = () => {
    return (
      <View
        style={{
          flex: 1,
          paddingHorizontal: 30,
          marginTop: SIZES.padding,
          justifyContent: 'space-between'
        }}
      >
        {/* Name & Description */}
        <View>
          <Text
            style={{
              color: appTheme?.headerColor,
              ...FONTS.h1,
              fontSize: 25
            }}
          >{selectedItem?.name}</Text>
          <Text
            style={{
              marginTop: SIZES.base,
              color: appTheme?.textColor,
              ...FONTS.body3
            }}
          >{selectedItem?.description}</Text>
        </View>

        {/* Size */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: SIZES.radius
          }}
        >
          {/* Label */}
          <Text
            style={{
              flex: 1,
              color: appTheme?.headerColor,
              ...FONTS.h2,
              fontSize: 20
            }}
          >
            Pick A Size
          </Text>

          {/* Cup */}
          <View
            style={{
              flex: 1,
              flexDirection: 'row'
            }}
          >
            <TouchableOpacity
              style={{
                justifyContent: 'flex-end',
                alignItems: 'center'
              }}
              onPress={() => setSelectedSize(20)}
            >
              <ImageBackground
                source={icons.coffee_cup}
                style={{
                  width: 80,
                  height: 80,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
                imageStyle={{
                  tintColor: selectedSize == 20 ? COLORS.primary : COLORS.gray2
                }}
              >
                <Text style={{ color: COLORS.white, ...FONTS.body4 }}>20oz</Text>
              </ImageBackground>

              {/* Price */}
              <Text style={{ color: COLORS.white, ...FONTS.body3, marginTop: 3 }}>$4.50</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                justifyContent: 'flex-end',
                alignItems: 'center'
              }}
              onPress={() => setSelectedSize(32)}
            >
              <ImageBackground
                source={icons.coffee_cup}
                style={{
                  width: 100,
                  height: 100,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
                imageStyle={{
                  tintColor: selectedSize == 32 ? COLORS.primary : COLORS.gray2
                }}
              >
                <Text style={{ color: COLORS.white, ...FONTS.body4 }}>32oz</Text>
              </ImageBackground>

              {/* Price */}
              <Text style={{ color: COLORS.white, ...FONTS.body3, marginTop: 3 }}>$5.00</Text>
            </TouchableOpacity>
          </View>

        </View>

        {/* Milk, Sweetness & Ice */}
        <View
          style={{
            flexDirection: 'row',
            marginTop: SIZES.padding
          }}
        >
          {/* Milk */}
          <View
            style={{
              flex: 1,
              alignItems: 'center'
            }}
          >
            <Text
              style={{
                color: appTheme?.headerColor,
                ...FONTS.h2,
                fontSize: 20
              }}
            >Milk</Text>

            <View
              style={{
                width: 100,
                height: 100,
                flexDirection: 'row',
                borderRadius: SIZES.radius,
                marginTop: SIZES.base,
                alignItems: 'center',
                backgroundColor: COLORS.primary
              }}
            >
              <IconButton
                icon={icons.leftArrow}
                iconStyle={{
                  width: 15,
                  height: 15,
                  tintColor: COLORS.black
                }}
                containerStyle={{
                  marginLeft: -13,
                  width: 25,
                  height: 25,
                  borderRadius: 5,
                  backgroundColor: COLORS.white
                }}
                onPress={() => {
                  if (milkIndex > 0) {
                    setMilkIndex(milkIndex - 1)
                  }
                }}
              />

              <Image
                source={milkList[milkIndex].image}
                resizeMode='contain'
                style={{
                  flex: 1,
                  width: 65,
                  height: 65,
                  tintColor: COLORS.white
                }}
              />

              <IconButton
                icon={icons.rightArrow}
                iconStyle={{
                  width: 15,
                  height: 15,
                  tintColor: COLORS.black
                }}
                containerStyle={{
                  marginRight: -13,
                  width: 25,
                  height: 25,
                  borderRadius: 5,
                  backgroundColor: COLORS.white
                }}
                onPress={() => {
                  if (milkIndex < milkList.length - 1) {
                    setMilkIndex(milkIndex + 1)
                  }
                }}
              />

            </View>

            <Text
              style={{
                marginTop: SIZES.base,
                ...FONTS.body3,
                color: COLORS.white
              }}
            >{milkList[milkIndex].name}</Text>

          </View>

          {/* Sweetness & Ice */}
          <View
            style={{
              flex: 1
            }}
          >
            {/* Sweetness */}
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                paddingHorizontal: SIZES.padding,
              }}
            >
              <Text
                style={{
                  textAlign: 'center',
                  color: appTheme?.headerColor,
                  ...FONTS.h2,
                  fontSize: 20
                }}
              >Sweetness</Text>

              <View
                style={{
                  // width: 100,
                  height: '60%',
                  flexDirection: 'row',
                  borderRadius: SIZES.radius,
                  alignItems: 'center',
                  backgroundColor: COLORS.primary
                }}
              >
                <IconButton
                  icon={icons.leftArrow}
                  iconStyle={{
                    width: 15,
                    height: 15,
                    tintColor: COLORS.black
                  }}
                  containerStyle={{
                    marginLeft: -13,
                    width: 25,
                    height: 25,
                    borderRadius: 5,
                    backgroundColor: COLORS.white
                  }}
                  onPress={() => {
                    if (sweetnessLevel > 0) {
                      setSweetnessLevel(sweetnessLevel - 25)
                    }
                  }}
                />

                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                >
                  <Text
                    style={{
                      color: COLORS.white,
                      ...FONTS.h3
                    }}
                  >{sweetnessLevel}%</Text>
                </View>

                <IconButton
                  icon={icons.rightArrow}
                  iconStyle={{
                    width: 15,
                    height: 15,
                    tintColor: COLORS.black
                  }}
                  containerStyle={{
                    marginRight: -13,
                    width: 25,
                    height: 25,
                    borderRadius: 5,
                    backgroundColor: COLORS.white
                  }}
                  onPress={() => {
                    if (sweetnessLevel < 100) {
                      setSweetnessLevel(sweetnessLevel + 25)
                    }
                  }}
                />
              </View>
            </View>

            {/* Ice */}
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                paddingHorizontal: SIZES.padding,
                marginTop: SIZES.base,
              }}
            >
              <Text
                style={{
                  textAlign: 'center',
                  color: appTheme?.headerColor,
                  ...FONTS.h2,
                  fontSize: 20
                }}
              >Ice</Text>

              <View
                style={{
                  height: '60%',
                  flexDirection: 'row',
                  borderRadius: SIZES.radius,
                  alignItems: 'center',
                  backgroundColor: COLORS.primary
                }}
              >
                <IconButton
                  icon={icons.leftArrow}
                  iconStyle={{
                    width: 15,
                    height: 15,
                    tintColor: COLORS.black
                  }}
                  containerStyle={{
                    marginLeft: -13,
                    width: 25,
                    height: 25,
                    borderRadius: 5,
                    backgroundColor: COLORS.white
                  }}
                  onPress={() => {
                    if (iceLevel > 0) {
                      setIceLevel(iceLevel - 25)
                    }
                  }}
                />

                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                >
                  <Text
                    style={{
                      color: COLORS.white,
                      ...FONTS.h3
                    }}
                  >{iceLevel}%</Text>
                </View>

                <IconButton
                  icon={icons.rightArrow}
                  iconStyle={{
                    width: 15,
                    height: 15,
                    tintColor: COLORS.black
                  }}
                  containerStyle={{
                    marginRight: -13,
                    width: 25,
                    height: 25,
                    borderRadius: 5,
                    backgroundColor: COLORS.white
                  }}
                  onPress={() => {
                    if (iceLevel < 100) {
                      setIceLevel(iceLevel + 25)
                    }
                  }}
                />
              </View>
            </View>

          </View>
        </View>
      </View>
    );
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: appTheme?.backgroundColor
      }}
    >
      <ScrollView
        style={{
          flex:1,
        }}
        contentContainerStyle={{
          paddingBottom:170
        }}
      >
        {/* Header */}
        {renderHeader()}

        {/* Details */}
        {renderDetail()}

      </ScrollView>
    </View>
  )
}

export default OrderDetail

const styles = StyleSheet.create({})