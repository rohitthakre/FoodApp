import {  Pressable, StyleSheet, Text, View,Image, Platform } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import MasonryList from '@react-native-seoul/masonry-list';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { CachedImage } from '../helpers/image';
import Loading from './Loading';
import { useNavigation } from '@react-navigation/native';

const RecipeCard = ({item,index,navigation})=>{
    console.log("KKKK Meals",item)
    let isEven = index%2 === 0;
    return(
        <Animated.View entering={FadeInDown.delay(index*100).duration(600).springify().damping(12)}>
            <Pressable style={{width:"100%",
            flex:1,justifyContent:"center",
            marginBottom:20
            ,paddingLeft:isEven ? 0 :8,
            paddingRight:isEven?8:0 
            }}
                onPress={() => { navigation.navigate("Recipedetails",{...item})}}
            >
                {Platform.OS === 'ios'?(               
                     <CachedImage
                        uri={ item.strMealThumb }
                        style={{
                            width: "100%", height: index % 3 === 0 ? hp(25) : hp(35), backgroundColor: "#808080",
                            borderRadius: 35}}
                            sharedTransitionTag={item.strMeal}
                     />
                ):(
                        <Image source = {{ uri: item.strMealThumb }}
                style={{
                    width: "100%", height: index % 3 === 0 ? hp(25) : hp(35), backgroundColor: "#808080",
                    borderRadius: 35
                }}
                            sharedTransitionTag={item.strMeal}

                />
                )}
                 <Text style={{fontSize:hp(2),color:"#808080"}}>
                    {
                        item.strMeal.length>20 ? item.strMeal.slice(0,20) + '...' :item.strMeal
                    }</Text>
            </Pressable>
        </Animated.View>
    ) 
}

const Recipes = ({meals ,categories}) => {
    const navigation = useNavigation();
    return (
        <View style={{ marginHorizontal: 20, marginVertical: 20 }}>
            <Text style={{ fontSize: hp(3), fontWeight: "600", color: "#808080" }}>Recipes</Text>
            <View >
                {
                   categories.length === 0|| meals.length === 0 ? (
                    <Loading size="large" style={{marginVertical:20}} />
                   ) :(
                        <MasonryList
                            data={meals}
                            keyExtractor={(item) => item.idMeals}
                            numColumns={2}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item, i }) => <RecipeCard item={item} index={i} navigation={navigation} />}
                            onEndReachedThreshold={0.1}
                        />
                    )
                }
               
            </View>
        </View>
    )
}

export default Recipes

const styles = StyleSheet.create({}) 