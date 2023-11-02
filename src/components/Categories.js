import { ScrollView, StyleSheet, Text, TouchableOpacity, View,Image, Platform } from 'react-native'
import React from 'react'
import { categoryData } from '../constants';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Animated,{ FadeInDown } from 'react-native-reanimated';
import { CachedImage } from '../helpers/image';


const Categories = ({ categories, activeCategory, handleChangesCategory }) => {
  return (
    <Animated.View entering={FadeInDown.duration(500).springify()}>
        <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{}}
        contentContainerStyle={{paddingHorizontal:15}}
        >
            {
                categories.map((cat,index)=>{

                    let isActive = cat.strCategory === activeCategory;
                    let activeButtonClass = isActive ? '#ff944d' :'#d3d3d3'

                    return(
                        <TouchableOpacity
                        key={index}
                            onPress={() => handleChangesCategory(cat.strCategory)}
                        style={{flex:1,alignItems:"center",justifyContent:"center",marginLeft:10}}
                        >
                            <View style={{padding:10,backgroundColor:activeButtonClass,borderRadius:hp(6)}}>
                               {Platform.OS ==='ios'?(
                                    <CachedImage
                                        uri={cat.strCategoryThumb} style={{
                                            width: hp(6),
                                            height: hp(6),
                                            borderRadius: hp(6)
                                        }}
                                    />
                               ):(

                                <Image source={{uri:cat.strCategoryThumb}}  style={{width:hp(6),
                                height:hp(6),
                                borderRadius:hp(6)
                                }}
                                // resizeMode='contain'
                                />
                               )}

                               

                            </View>
                            <Text style={{fontSize:hp(1.6)}}>{cat.strCategory}</Text>
                        </TouchableOpacity>
                    )
                })
            }
        </ScrollView>
    </Animated.View>
  )
}

export default Categories

const styles = StyleSheet.create({})