import React, { useEffect, useState } from 'react'
import { StatusBar, Image, StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput, Platform } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { BellIcon, MagnifyingGlassIcon } from "react-native-heroicons/outline";
import Categories from '../components/Categories';
import axios from 'axios';
import Recipes from '../components/Recipes';
const HomeScreen = () => {

  const [activeCategory,setActiveCategory]= useState('Beef')
  const [categories,setCategory] = useState([]);
  const [meals,setMeals] = useState([]);

useEffect(()=>{
  getCategory();
  getRecipe();
},[])

const handleChangesCategory = category =>{
  getRecipe(category);
  setActiveCategory(category);
  setMeals([]);
}

  const getCategory = async()=>{
    try{
      const responce = await axios.get('https://themealdb.com/api/json/v1/1/categories.php')
        console.log("category data",responce.data)  
      if(responce && responce.data){
        setCategory(responce.data.categories)
        }

    }catch(error){
      console.log("error",error.message)
    }
  }

  const getRecipe = async (category="Beef") => {
    try {
      const responce = await axios.get(`https://themealdb.com/api/json/v1/1/filter.php?c=${category}`)
      console.log("Meals data", responce.data)
      if (responce && responce.data) {
        setMeals(responce.data.meals)
      }

    } catch (error) {
      console.log("error", error.message)
    }
  }

  return (
    <View style={styles.Container}>
      <StatusBar barStyle={'dark-content'} backgroundColor={"#FFF"} />
      
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
        style={styles.SubContainer}
        nestedScrollEnabled={true} 
      >
        {/* Avtar Image and Bell */}
        <View style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginHorizontal: 20,
          marginTop:Platform.OS === 'ios'?20:0
        }}>
          <TouchableOpacity activeOpacity={0.8}>
            <Image source={require("../../assets/images/avatar.png")}
              style={{ width: hp(5), height: hp(5.5) }}
              resizeMode='contain' />
          </TouchableOpacity>
          <TouchableOpacity>
            <BellIcon size={hp(4)} color="#808080" />
          </TouchableOpacity>
        </View>

        {/* Greetings and Punchline  */}
          <View style={{marginHorizontal:20,marginVertical:10}}>
            <Text style={{fontSize:hp(1.7),color:"#808080"}}>Hello, Rohit</Text>
            <View>
              <Text style={{fontSize:hp(3.8),fontWeight:"800"}}>Mack your own food</Text>
            </View>
            <Text style={{fontSize:hp(3.8),color:"#808080",fontWeight:"800"}}>stay at <Text style={{ color:"#ff751a",fontWeight:"800"}}>Home</Text>
            </Text>

            {/* Search bar  */}
              <View style={{flexDirection:"row",
            borderRadius:30,
            backgroundColor:"#d3d3d3",
            alignItems:"center",
            marginVertical:20

            }}>
              <TextInput
              placeholder='Search any recipe'
              placeholderTextColor={"#808080"}
              style={{fontSize:hp(1.7),flex:1,textAlign:"justify",paddingLeft:10 }}
              />
              <View style={{backgroundColor:"#FFF",alignItems:"center",justifyContent:"center",padding:10,borderRadius:20,marginRight:5}}>
                  <MagnifyingGlassIcon size={hp(2.5)} strokeWidth={3} color={"#808080"} />
              </View>
              </View>
          </View>

            {/* Category  */}
            <View>
              {
            categories.length > 0 && <Categories categories={categories} activeCategory={activeCategory} handleChangesCategory={handleChangesCategory}/>
                }
            </View>

            {/* Recipes */}
            <View >
              <Recipes meals={meals} categories={categories}/>
            </View>
      </ScrollView>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: "#FFF"
  },
  SubContainer: {
    marginVertical: 6,
    
  }
})